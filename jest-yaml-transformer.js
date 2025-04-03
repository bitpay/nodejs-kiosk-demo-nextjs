const transformer = require("jest-transform-yaml").default;

const newTransformer = {
  ...transformer,
};

module.exports = newTransformer;
