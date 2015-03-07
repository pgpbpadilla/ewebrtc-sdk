/*jslint browser: true, devel: true, node: true, debug: true, todo: true, indent: 2, maxlen: 150, unparam: true*/
/*global exports, require*/

(function () {
  'use strict';

  var oauth = require('./att.rtc.dhs.oauth').oauth,
    e911 = require('./att.rtc.dhs.e911').e911;

  /**
   * @function
   * configure
   * @summary
   * Configures application with provided AT&T key and secret.
   * @desc
   * A DHS method to configure application with the passed AT&T
   * application key and secret
   *
   * @param {object} options
   * @param {string} options.app_key - AT&T application key.
   * @param {string} options.app_secret - AT&T application secret.

   *
   * @memberOf ATT.rtc.dhs
   *
   * @example
   * var options = {
   *   app_key: 'thirtytwocharacterapplicationkey',
   *   app_secret: '32_characters_application_secret'
   * };
   *
   * ATT.rtc.dhs.configure(options);
   */

  function configure(options) {

    if (undefined === options
        || Object.keys(options).length === 0) {
      throw new Error('No options provided');
    }

    if (undefined === options.app_key) {
      throw new Error('No app_key provided');
    }

    if (undefined === options.app_secret) {
      throw new Error('No app_secret provided');
    }

    oauth.app_key = options.app_key;
    oauth.app_secret = options.app_secret;

    e911.app_key = options.app_key;
    e911.app_secret = options.app_secret;
  }

  exports.ATT = {
    rtc: {
      /**
       * @namespace
       * ATT.rtc.dhs
       *
       *@desc
       * **Note:** This API is only usable if you use the built-in DHS provided with the SDK.
       *
       * The `dhs` namespace provides a client API for using our optional DHS RESTful API.
       * The DHS RESTful API allows you to perform the following actions:
       *
       * * Create access tokens using AT&T's OAuth
       * * Create E911 Ids using AT&T's OAuth and API
       */
      dhs: {
        configure: configure,
        getUserConsentUrl: oauth.getUserConsentUrl,
        createAccessToken: oauth.createAccessToken,
        createE911Id: e911.createE911Id
      }
    }
  };

}());