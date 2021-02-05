'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./ark-changenow-v3.cjs.prod.js");
} else {
  module.exports = require("./ark-changenow-v3.cjs.dev.js");
}
