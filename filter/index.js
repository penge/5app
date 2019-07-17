const util = require('util');
const filterPayload = require('./filter-payload');
const findThumbnail = require('./find-thumbnail');

// Our usecase:
const greaterThanCount = 1;
const findThumbnailFunction = logos => findThumbnail(logos, 64, 128);

// Handler
exports.handler = async(event, context) => {
  try {
    const payload = JSON.parse(event.body).payload;
    const response = filterPayload(payload, greaterThanCount, findThumbnailFunction); // returns array

    console.log('Payload is:\n', util.inspect(payload));
    console.log('Response is:\n', util.inspect(response));

    return {
      statusCode: 200,
      body: JSON.stringify({ response }) // { "response": [{},{},...] }
    };
  } catch (e) {
    return {
      statusCode: 400
    };
  }
};
