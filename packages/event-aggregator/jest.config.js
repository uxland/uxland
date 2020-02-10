const config = require('../../config/jest.lit-element.config');
const pack = require('./package');

module.exports = { ...config, name: pack.name, displayName: pack.name };
