/*jslint browser: true, devel: true, node: true, debug: true, todo: true, indent: 2, maxlen: 150, unparam: true*/
/*global require, module*/

(function () {
  'use strict';

  /**
   *---------------------------------------------------------
   * routes/att.js
   *---------------------------------------------------------
   * Implements Routes for Administration functions.
   *
   * Needed only if you are planning to let AT&T Mobile
   * Subscribers to use your App.
   *
   * Following routes are available:
   *
   * GET /authorize
   * GET /callback
   * GET /token
   * GET /e911id
   *
   * Ultimately, Express app exposes these routes as:
   *
   * GET <your_app_url>/oauth/authorize
   * GET <your_app_url>/oauth/callback
   * GET <your_app_url>/oauth/token
   * GET <your_app_url>/e911id
   *
   * CAUTION:
   * Ensure that <your_app_url>/oauth/callback exactly
   * matches what you configured in the Dev Portal when
   * while you were creating app with WEBRTCMOBILE scope.
   *
   *---------------------------------------------------------
   * @author Raj Sesetti, AT&T Developer Program, DRT/LTA
   *---------------------------------------------------------
   */

  var express = require('express'),
    dhs = require('../lib/js/att.rtc.dhs').ATT.rtc.dhs,

    oauth,
    e911,
    env_config,
    redirect_uri;

  oauth = express.Router();
  e911 = express.Router();

    // Configure the DHS library with app key and secret
  // before it can be used

  function initialize(config) {
    env_config = config;
    dhs.configure({
      app_key: env_config.app_key,
      app_secret: env_config.app_secret
    });
  }

  /**
   * When browser client asks for AT&T subscriber's
   * authorization (aka user consent), simply redirect
   * to AT&T OAuth API for authorization
   *
   * @param {String} Some input
   * @param {String} Some other input
   * @param {Function} A callback
   * @api public
   */

  oauth.get('/authorize', function (req, res) {

    console.log('Got authorize request');

    redirect_uri = req.query.redirect_uri;

    if (!redirect_uri) {
      console.log('No redirect URL');

      res.json(400, {
        message: 'No redirect URI provided. Authorize requires a redirect URI'
      });

    } else {

      try {
        var authorize_url = dhs.getUserConsentUrl();

        console.log('Redirecting to: %s', authorize_url);

        res.redirect(authorize_url);

      } catch (error) {
        console.log('Error: %s', error.message);

        res.json(400, {
          error: error.message
        });
      }

    }

  });

  /**
   * IMPORTANT:
   * Fully-qualified URL for this route should match
   * what you have configured in the Developer Portal
   * when you created an App with WEBRTCMOBILE scope.
   *
   * @param {String} Some input
   * @param {String} Some other input
   * @param {Function} A callback
   * @api public
   */
  oauth.get('/callback', function (req, res) {

    console.log('Got callback request');

    var auth_code = req.query.code;

    console.log('Authorization code: %s', auth_code);

    if (auth_code) {

      if (redirect_uri) {
        console.log('Redirecting to: %s', redirect_uri);

        //redirect to the URI relative to the root
        res.redirect(redirect_uri + '?code=' + auth_code);
      } else {
        res.json(400, {
          message: 'No redirect URI. Unable to redirect'
        });
      }

    } else {
      res.json(400, {
        message: 'Unable to retrieve authorization code'
      });
    }
  });

  oauth.post('/token', function (req, res) {
    console.log('Got token request');

    var app_scope = req.body.app_scope,
      auth_code = req.body.auth_code;

    console.log('App scope: %s', req.body.app_scope);
    console.log('Auth code: %s', req.body.auth_code);

    console.log('Creating access token');

    try {
      dhs.createAccessToken({
        app_scope: app_scope,
        auth_code: auth_code,
        success: function (response) {
          console.log('Success in creating access token: %s', response);

          res.json(200, response);
        },
        error: function (error) {
          console.log('Error in creating access token: %s', error);

          res.json(400, error);
        }
      });
    } catch (error) {
      console.log('Error: %s', error.message);

      res.json(400, {
        error: error.message
      });
    }
  });

  e911.post('/', function (req, res) {
    console.log('Got e911id request');

    var token = req.body.token,
      address = req.body.address,
      is_confirmed = req.body.is_confirmed;

    console.log('Token: %s', req.body.token);
    console.log('Address: %s', req.body.address);
    console.log('Is Address Confirmed: %s', req.body.is_confirmed);

    console.log('Creating e911 id');

    try {
      dhs.createE911Id({
        token: token,
        address: address,
        is_confirmed: is_confirmed,
        success: function (response) {
          console.log('Success in creating e911 id: %s', response);

          res.json(200, response);
        },
        error: function (error) {
          console.log('Error in creating e911 id: %s', error);

          res.json(400, error);
        }
      });
    } catch (error) {
      console.log('Error: %s', error.message);

      res.json(400, {
        error: error.message
      });
    }
  });

  module.exports = {
    initialize: initialize,
    oauth: oauth,
    e911: e911
  };

//-----------------------------------------------------------
// END: routes/att.js
//-----------------------------------------------------------

}());