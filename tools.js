const R = require('ramda');

const idLens = R.lensPath(['id']);
const bodyLens = R.lensPath(['body']);
const getId = R.view(idLens);
const getBody = R.view(bodyLens);
const getAsReadable = R.compose(R.join(' -> '), R.juxt([getId, getBody]));

module.exports.composeHello = R.compose(
  R.concat('Hello Restify, data is: '),
  R.join('; '),
  R.map(getAsReadable),
  R.prop('rows'),
);

/**
 * toolkit for response codes
 */
const senderInvoker = R.invoker(2, 'send');
module.exports.sendHttp200 = senderInvoker(200);
module.exports.sendHttp404 = senderInvoker(404);
