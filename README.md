# next-koa-monorepo-template

## Getting Started

### Installing

#### **Step 1 - Prerequisites**

- Yarnpkg v3.1.1 or higher
- Node.js v16.13.2 or higher
- MySQL Server v8.0.26 or higher

#### **Step 2 - Clone Repository**

```bash
git clone git@github.com:theluckyegg/next-koa-monorepo.git
```

### Compiling

#### **Step 1 - Install Dependencies**

```bash
yarn install
```

#### **Step 2 - Run the build script**

```bash
yarn build # build:libs && build:api && build:web
```

### Starting

### **Step 1 - Copy `.env.example` to `.env`**

```bash
cp .env.example .env
```

### **Step 2 - Populate environment variables**

```bash
vim .env
```

#### **Step 3 - Run the start script**

```bash
yarn start # start:api && start:web
```

## Developing

#### **Step 1 - Build common libraries**

```bash
yarn build:libs
```

#### **Step 1 - Watch the source files**

```bash
yarn serve
```

### Running

```bash
yarn serve # serve:api && serve:web
```

### Testing

```bash
yarn test # test:api && test:web
```

## Deploying

### **Step 1 - Copy `.env.example` to `.env`**

### **Step 2 - Populate environment variables**

```bash
# email of the initial admin user
ADMIN_EMAIL=admin@example.com
# username of the initial admin user
ADMIN_USER=admin
# password of the initial admin user
ADMIN_PASS=password

# port of the mysql server
DB_MYSQL_PORT=3306
# host of the mysql server
DB_MYSQL_URL=mysql.example.com
# username of the mysql server
DB_MYSQL_USERNAME=admin
# password of the mysql server
DB_MYSQL_PASSWORD=password
# name of the mysql database
DB_MYSQL_SCHEMA=next-koa-monorepo
```

### **Step 2 - Run the deploy script**

Follow the instructions defined under [Getting Started](#getting-started)

## See Also

- **[back-end](/packages/api) - api for web application**
- **[front-end](/packages/web) - front-end for web application**

## Documentation

Specifications & design documents can be found in the [WIKI](/wiki).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for a in depth view.

## Credits

Please see [CREDITS.md](CREDITS.md) for a in depth view.

## License

This project is licensed under the **GPL-3.0** License.

See [LICENSE.md](LICENSE.md) file for details.
