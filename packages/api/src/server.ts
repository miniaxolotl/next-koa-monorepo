import _ from 'lodash';
import fs from 'fs';

import Body from 'koa-body';
import CORS from '@koa/cors';
import KoaJSON from 'koa-json';
import KoaLogger from 'koa-logger';
import KoaSession from 'koa-session';
import Router from 'koa-router';
import websockify from 'koa-websocket';
import Koa, { ParameterizedContext } from 'koa';

import { ServerConfig as config } from '@libs/config';
import { connectDB } from '@libs/database';
import { HTTPError, SERVER_ERROR } from '@libs/shared';

import { SessionController } from './controller/auth/session';

/************************************************
 * setup
 ************************************************/

const koaApp: Koa = new Koa();

const wsOptions = {};
const app = websockify(koaApp, wsOptions);

const router: Router = new Router();
const socket_router = new Router();

/************************************************
 * database
 ************************************************/

(async () => {
  await connectDB();
})();

/************************************************
 * middleware
 ************************************************/

app.keys = config.SESSION_KEYS;

app.use(
  KoaSession(
    {
      key: 'session',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      renew: true,
    },
    app,
  ),
);

app.use(
  CORS({
    origin: '*',
    credentials: true,
  }),
);

app.use(KoaJSON({ pretty: false, param: 'pretty' }));

app.use(
  Body({
    formidable: {
      maxFileSize: config.MAX_BYTES,
      uploadDir: config.DATA_DIR,
      multiples: true,
    },
    multipart: true,
    urlencoded: true,
  }),
);
if (config.DEVELOPMENT) app.use(KoaLogger());

/** NOTE: log errors */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e: unknown) {
    if (config.DEVELOPMENT) console.log(e);
    const error: HTTPError = e as HTTPError;
    ctx.status = error.status ?? SERVER_ERROR.INTERNAL.status;
    ctx.body = error.status ? error.message : SERVER_ERROR.INTERNAL.message;
  }
});

/** NOTE: sanitize output */
app.use(async (ctx, next) => {
  await next();
  if (typeof ctx.body === 'string') return ctx.body;
  if (!ctx.body) {
    ctx.status = SERVER_ERROR.NOT_IMPLEMENTED.status;
    ctx.body = SERVER_ERROR.NOT_IMPLEMENTED.message;
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const omit = (obj: Record<string, any>) => {
    if (obj.toString() !== '[object Object]') return obj;
    if (typeof obj === 'object' && !_.isArray(obj)) {
      obj = _.omitBy(obj, _.isNil);
      obj = _.omit(obj, ['password']);
    }
    for (const key in obj) {
      if (_.isArray(obj)) {
        obj[key] = !_.isObject(obj[key]) ? obj[key] : omit(obj[key]);
      } else {
        obj = {
          ...obj,
          [key]: !_.isObject(obj[key]) ? obj[key] : omit(obj[key]),
        };
      }
    }
    return obj;
  };

  return (ctx.body = omit(ctx.body));
});

/************************************************
 * authentication
 ************************************************/

/************************************************
 * routes
 ************************************************/

{
  /* api/v1 */

  router.use(`/api/v1/auth`, SessionController.router.routes());
  // router.use(`/api/v1/auth/refresh`, SessionController.router.routes());

  const versions = fs.readdirSync('./src/controller/');

  for (const version of versions) {
    try {
      const _version: Router = new Router();
      const modules = fs.readdirSync(`./src/controller/${version}/`).map((m) => m);

      for (const module of modules) {
        const _module: {
          route: string;
          router: Router<unknown, unknown>;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
        } = require(`./controller/${version}/${module}/${module}.controller`);
        _version.use(_module.route, _module.router.routes());
        // app.env && console.log(`load_module: ${version}/${module}`);
      }
      router.use(`/api/${version}`, _version.routes());
    } catch (e) {
      console.log(e);
    }
  }
}

app.use(router.routes());

{
  /* websocket */
  socket_router.all('', async (ctx: ParameterizedContext) => {
    ctx.websocket.on('message', (message: string) => {
      message.localeCompare('ping') == 0 ? ctx.websocket.send('pong!') : null;
    });
  });
}

app.ws.use(socket_router.routes() as unknown as Koa.Middleware);

/************************************************
 * start server
 ************************************************/

if (!fs.existsSync(config.DATA_DIR)) {
  fs.mkdirSync(config.DATA_DIR, { recursive: true });
}

app.listen(config.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening: http://localhost:${config.SERVER_PORT}`);
  // eslint-disable-next-line no-console
  console.log(`enviroment: ${app.env}`);
});
