/*jslint browser: true, devel: true, node: true, debug: true, todo: true, indent: 2, maxlen: 150, unparam: true*/
/*global require, exports*/

(function () {
  'use strict';

  var pkg = require('../package.json'),
    restify = require('restify'),
    grantTypes,
    appScopes;

  grantTypes = {
    'MOBILE_NUMBER': 'authorization_code',
    'VIRTUAL_NUMBER': 'client_credentials',
    'ACCOUNT_ID': 'client_credentials',
    'E911': 'client_credentials',
    'REFRESH': 'refresh_token'
  };

  appScopes = {
    'MOBILE_NUMBER': 'WEBRTCMOBILE',
    'VIRTUAL_NUMBER': 'WEBRTC',
    'ACCOUNT_ID': 'WEBRTC',
    'E911': 'EMERGENCYSERVICES'
  };

  function getGrantType(app_scope) {
    return grantTypes[app_scope];
  }

  function getScope(app_scope) {
    return appScopes[app_scope];
  }

  /**
   * @function
   * getUserConsentUrl
   * @summary
   * Returns user consent page url
   * @desc
   * Forms the consent page url by concatenating the API endpoint,
   * Authorization URI, Application Key and Application Scope in
   * a single URL string
   *
   * @returns {string} User consent page url
   *
   * @memberOf ATT.rtc.dhs
   *
   * @example
   * // Get user consent URL
   * var consentURL = ATT.rtc.dhs.getUserConsentUrl();
   */

  function getUserConsentUrl() {
    if (undefined === exports.oauth.app_key
        || undefined === exports.oauth.app_secret) {
      throw new Error('DHS not configured. ' +
        'Please invoke ATT.rtc.dhs.configure with your app_key and app_secret');
    }

    return pkg.api_endpoint + pkg.authorize_uri +
      '?client_id=' + exports.oauth.app_key + '&' + 'scope=' + getScope('MOBILE_NUMBER');
  }

  /**
   * @function
   * createAccessToken
   * @summary
   * Creates an Access Token using AT&T's OAuth for mobile number, virtual number and account id users
   * @desc
   * This methods accepts a `app_scope` and creates the `access token` for that particular `app_scope`
   * Accepted values for `app_scope` are: `MOBILE_NUMBER`, `VIRTUAL_NUMBER`,
   * `ACCOUNT_ID` and `E911`.
   * This method requires an access token obtained using `E911` auth_scope and a physical address with
   * obtained during the consent flow.
   *
   * @param {object} options
   * @param {string} app_scope - Application scope for getting access token
   * @param {string} [auth_code] - Authorization Code from user consent for mobile number user
   * @param {function} success - The callback that handles the successful response after creating an AT&T OAuth Access Token
   * @param {function} error - The callback that handles the generated error
   *
   * @memberOf ATT.rtc.dhs
   *
   * @example
   * // Create access token using DHS
   * var options = {
   *   app_scope: 'E911',
   *   success: function (result) {
   *      // do something
   *   },
   *   error: function (err) {
   *      // do something
   *   }
   * };
   *
   * ATT.rtc.dhs.createAccessToken(options);
   *
   * @example
   * // Create access token for Mobile Number using DHS
   * var options = {
   *   app_scope: 'MOBILE_NUMBER',
   *   auth_code: 'auth_code_from_consent_flow',
   *   success: function (result) {
   *      // do something
   *   },
   *   error: function (err) {
   *      // do something
   *   }
   * };
   *
   * ATT.rtc.dhs.createAccessToken(options);
   */

  function createAccessToken(options) {

    if (undefined === exports.oauth.app_key
        || undefined === exports.oauth.app_secret) {
      throw new Error('DHS not configured. ' +
        'Please invoke ATT.rtc.dhs.configure with your app_key and app_secret');
    }

    if (undefined === options
        || Object.keys(options).length === 0
        || undefined === options.app_scope) {
      throw new Error('No app scope provided');
    }

    if ('MOBILE_NUMBER' !== options.app_scope
        && 'VIRTUAL_NUMBER' !== options.app_scope
        && 'ACCOUNT_ID' !== options.app_scope
        && 'E911' !== options.app_scope) {
      throw new Error('Invalid app scope provided');
    }

    if ('MOBILE_NUMBER' === options.app_scope
        && undefined === options.auth_code) {
      throw new Error('No auth code provided');
    }

    if (undefined === options.success) {
      throw new Error('No success callback provided');
    }

    if (undefined === options.error) {
      throw new Error('No error callback provided');
    }

    var restClient,
      payload;

    restClient = restify.createStringClient({
      url: pkg.api_endpoint,
      userAgent: pkg.name,
      accept: 'application/json',
      rejectUnauthorized: false
    });

    payload = {
      client_id: exports.oauth.app_key,
      client_secret: exports.oauth.app_secret,
      grant_type: getGrantType(options.app_scope),
      scope: getScope(options.app_scope),
      code: options.auth_code
    };

    restClient.post(pkg.token_uri, payload, function (error, req, res, result) {
      if (undefined !== error &&
          null !== error) {
        options.error(error);
        return;
      }
      options.success(result);
    });
  }

  exports.oauth = {
    getUserConsentUrl: getUserConsentUrl,
    createAccessToken: createAccessToken
  };

}());