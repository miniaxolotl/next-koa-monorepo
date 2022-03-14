import _ from 'lodash';

import { Prisma } from '@prisma/client';

import { RoleEnum } from '@libs/shared';
import { ServerConfig } from '@libs/config';
import { createID } from '@libs/utility';
import { genHash } from '@libs/crypt';
import { connectDB, db } from '@libs/database';

(async () => {
  await connectDB();

  const roleData: Prisma.RoleCreateInput[] = _.map(RoleEnum, (r) => r);

  const seed_password = async () => await genHash(ServerConfig.ADMIN_PASS);

  const admin: Prisma.UserCreateInput = {
    userId: createID(),
    email: ServerConfig.ADMIN_EMAIL,
    password: await genHash(ServerConfig.ADMIN_PASS),
  };

  const userData: Promise<Prisma.UserCreateInput>[] = [
    ..._.times(10, async () => ({
      userId: createID(),
      email: `${createID(6)}@emawa.io`,
      password: await seed_password(),
    })),
  ];

  console.log('\n/**************** seeding ****************/');

  console.log('\n---- role ----');

  /************* ROLE *************/
  for (const r of roleData) {
    const role = await db.role.create({
      data: r,
    });
    console.log(`created role: ${role.role}`);
  }

  console.log('\n---- user ----');

  /************* USER *************/
  const user = await db.user.create({
    data: {
      ...admin,
      roles: {
        create: [
          {
            roleId: RoleEnum.DEVELOPER.role,
          },
          {
            roleId: RoleEnum.ADMIN.role,
          },
          {
            roleId: RoleEnum.USER.role,
          },
        ],
      },
    },
  });
  console.log(`created user:#${user.userId}\n${user.email}\n${user.password}\n`);

  for (const u of userData) {
    const user = await db.user.create({
      data: {
        ...(await u),
        roles: {
          create: [{ roleId: RoleEnum.USER.role }],
        },
      },
    });
    console.log(`created user:#${user.userId}\n${user.email}\n${user.password}\n`);
  }
})();
