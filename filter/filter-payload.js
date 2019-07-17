/*
  Takes payload (array of objects) of this structure:

  [
    {
      name,
      count,
      logos: [
        {
          size, // size acceptable for response: between "64x64" and "128x128", smallest found preferred
          url   // url === thumbnail in response
        },
        ...
      ]
    },
    ...
  ]

  And returns response (array of objects), keeping only items that:
  - have count > greaterThanCount
  - have thumbnail found by findThumbnailFunction (thumbnail is url to smallest logo within range of minWidth and maxWidth)

  Our usecase:
  - greaterThanCount = 1
  - findThumbnailFunction = (logos) => findThumbnail(logos, 64, 128)

  Example response:

  [
    {
      name,
      count,
      thumbnail,
    },
    ...
  ]
*/

module.exports = (payload, greaterThanCount, findThumbnailFunction) => {
  let response = [];

  payload.forEach(item => {
    const { name, count, logos } = item;

    // Item needs to have count > greaterThanCount (our usecase: greaterThanCount = 1)
    if (!(count > greaterThanCount)) {
      return;
    }

    const thumbnail = findThumbnailFunction(logos);

    // Item needs to have thumbnail (url) within range of minWidth and maxWidth
    if (!thumbnail) {
      return;
    }

    // Item is added to response (valid count, valid thumbnail)
    response.push({ name, count, thumbnail });
  });

  return response;
};
