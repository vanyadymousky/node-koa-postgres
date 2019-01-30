const Koa = require('koa');
const { Client } = require('pg');
const R = require('ramda');
const app = new Koa();

const idLens = R.lensPath(['id']);
const bodyLens = R.lensPath(['body']);
const getId = R.view(idLens);
const getBody = R.view(bodyLens);
const getAsReadable = R.compose(
  R.join(' -> '),
  R.juxt([getId, getBody]),
);

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const connectPostgres = async () => {
  const client = new Client();
  await client.connect();
  return client;
};

// response
app.use(async ctx => {
  const client = await connectPostgres();

  const res = await client.query('SELECT id, body FROM news');
  const body = `Hello Koa, now is: ${res.rows.map(getAsReadable).join('; ')}`;
  debugger;
  ctx.body = body;
  await client.end();
});

app.listen(3000);
