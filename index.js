const restify = require('restify');
const { Client } = require('pg');
const { composeHello, sendHttp200 } = require('./tools');
const app = restify.createServer({
  name: 'expedite',
  version: '1.0.0',
});

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const connectPostgres = async () => {
  const client = new Client();
  await client.connect();
  return client;
};

app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());

app.get('/', async (req, res, next) => {
  console.time('main');
  const client = await connectPostgres();

  const response = await client.query('SELECT id, body FROM news');
  // const body = `Hello Restify, data is: ${response.rows.map(getAsReadable).join('; ')}`;
  await client.end();
  sendHttp200(composeHello(response), res);
  console.timeEnd('main');
  return next();
});

app.listen(3000, function () {
  console.log('%s listening at %s', app.name, app.url);
});
