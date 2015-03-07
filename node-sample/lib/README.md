# DHS Lib for AT&T Enhanced WebRTC JavaScript SDK

This Developer Hosted Server (DHS) Library is a node library that enables you to manage the following:

* AT&T OAuth token creation using credentials and scope
* E911 ID creation

## Contents of this Package

This package contains the software necessary to run a DHSL for
a Node.js sample Web app.

- `/package.json` - Configuration options
- `/js/att.rtc.dhs.js` - Main Node.js module
- `/js/att.rtc.dhs.oauth.js` - OAuth Node.js module
- `/js/att.rtc.dhs.e911.js` - E911 Node.js module


## API documentation references

Please refer the DHS Library api-documentation for public methods
  - ATT.rtc.dhs.configure(options)
  - ATT.rtc.dhs.createE911Id(options)
  - ATT.rtc.dhs.getUserConsentUrl()
  - ATT.rtc.dhs.createAccessToken(options)
