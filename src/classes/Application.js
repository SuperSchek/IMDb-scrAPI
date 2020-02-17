const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _merge = require("lodash/merge");
const constants = require("../constants");
const Router = require("../classes/Router");

class Application {
  constructor() {
    this._options = constants.DEFAULT_OPTIONS;
  }

  /**
   * Returns the options object
   * @public
   *
   * @returns {object}
   */
  get options() {
    return this._options;
  }

  /**
   * Checks whether the payload contains an object and if so
   */
  set options(payload) {
    if (payload instanceof Object) {
      this._options = payload;
    } else {
      throw new TypeError(
        `Expected payload to be an Object. Got: ${payload.constructor.name}`
      );
    }
  }

  _parseOptions(options) {
    if (options) {
      _merge(this.options, options);
    }
  }

  /**
   * Serves up an instance of the API
   * @public
   *
   * @description Sets the options, loads routes, starts listening on specified port and prints success message to the console if all is well.
   *
   * @param {object} options
   */
  serve(options) {
    this._parseOptions(options);
    this._initializeExpress();
    this._initializeRoutes();

    console.log(`Serving IMDb-scrAPI on port ${this.options.port}`);
  }

  _initializeExpress() {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
    app.listen(this.options.port);
  }

  _initializeRoutes() {
    const router = express.Router();
    app.use(this.options.routesPrefix, router);
    new Router().loadRoutes(router, this.options.routes);
  }
}

module.exports = Application;
