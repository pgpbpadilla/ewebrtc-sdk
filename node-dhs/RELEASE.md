# Node.js DHS for the AT&T Enhanced WebRTC JavaScript SDK

The DHS is a Node.js application with the following functionality:
  * Manage configuration options for the SDK's Node Sample Application
  * Manage Application configuration (application key, secret, redirect_uri, etc.)
  * Handle AT&T OAuth Token creation using credentials and scope.
  * Create E911 Id given an address.

# v1.0.0

December 7, 2014

* **Features:**
  * Configuration file for AT&T Developer Program enrollment assets (application key and secret, redirect_uri).
  * RESTful API:
    * `/config` - Environment options necessary to configure the SDK.
    * `/tokens` - AT&T's OAuth use to generate Access Tokens
    * `/e911ids` - Create E911 Ids
  * **Documentation:**
    * Instructions for DHS setup and configuration for different environments
    * Description of the RESTful API calls made by the DHS


### Known Issues

* DHS Configuration: Virtual Numbers must be valid 10-digit phone numbers.
