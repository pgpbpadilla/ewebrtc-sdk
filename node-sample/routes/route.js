/*jslint browser: true, devel: true, node: true, debug: true, todo: true, indent: 2, maxlen: 150, unparam: true*/
/*global require, module*/

(function () {
  'use strict';

  var express = require('express'),
    route = express.Router(),
    env_config;

  route.initialize = function (config) {
    env_config = config;
  };

  route.configuration = function (req, res) {
    if (env_config) {
      res.send(200, {
        api_endpoint: env_config.api_endpoint,
        ewebrtc_uri: env_config.ewebrtc_uri,
        virtual_numbers_pool: env_config.virtual_numbers_pool,
        ewebrtc_domain: env_config.ewebrtc_domain
      });
    } else {
      res.send(400, {
        message: 'Environment not configured'
      });
    }
  };

  module.exports = route;

}());