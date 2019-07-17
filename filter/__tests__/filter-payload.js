const assert = require('assert').strict;
const filterPayload = require('../filter-payload');
const findThumbnail = require('../find-thumbnail');

// Samples:
const sampleRequest = require('../samples/request.json');
const sampleResponse = require('../samples/response.json');

// Our usecase:
const greaterThanCount = 1;
const findThumbnailFunction = logos => findThumbnail(logos, 64, 128);

// Test:
const response = filterPayload(sampleRequest.payload, greaterThanCount, findThumbnailFunction);
assert.deepStrictEqual(response, sampleResponse.response);
