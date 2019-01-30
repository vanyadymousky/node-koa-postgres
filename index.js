const Koa = require('koa');
const Router = require('koa-router');
const { Client } = require('pg');
const { getAsReadable } = require('./tools');
const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const connectPostgres = async () => {
  const client = new Client();
  await client.connect();
  return client;
};

router.get('favicon.ico', (ctx, next) => {
  ctx.res.statusCode = 404;
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async ctx => {
    console.time('main');
    console.log('hit');
    const client = await connectPostgres();

    const res = await client.query('SELECT id, body FROM news');
    const body = `Hello Koa, now is: ${res.rows.map(getAsReadable).join('; ')}`;
    ctx.body = body;
    await client.end();
    console.timeEnd('main');
  });

app.listen(3000);
