const R = require('ramda');

const idLens = R.lensPath(['id']);
const bodyLens = R.lensPath(['body']);
const getId = R.view(idLens);
const getBody = R.view(bodyLens);

module.exports.getAsReadable = R.compose(R.join(' -> '), R.juxt([getId, getBody]));
