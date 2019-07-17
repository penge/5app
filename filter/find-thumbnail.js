/*
  Receives logos (array of objects) of this structure:

  [
    {
      size,
      url
    },
    ...
  ]

  Returns thumbnail (same value as url) to smallest logo,
  that is having its size within range of minWidth and maxWidth.

  Our usecase:
  - minWidth = 64
  - maxWidth = 128

  If logo within this size is not found, undefined is returned.
*/

module.exports = (logos, minWidth, maxWidth) => {
  let smallestWidth = Infinity;
  let thumbnail = undefined; // url

  logos.forEach(logo => {
    const { size, url } = logo;

    // Example: 64x64 => 64
    const currentWidth = parseInt(size.split('x')[0], 10);

    // Example: 96 >= 64 && 96 <= 128
    const isInRange = currentWidth >= minWidth && currentWidth <= maxWidth;

    // Example: 96 < Infinity
    const isSmaller = currentWidth < smallestWidth;

    // Looking for smallest logo within range
    if (isInRange && isSmaller) {
      smallestWidth = currentWidth;
      thumbnail = url;
    }
  });

  return thumbnail; // url
};
