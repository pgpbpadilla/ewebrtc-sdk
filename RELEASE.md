# AT&T Enhanced WebRTC JS SDK

This SDK includes the following components:

* JavaScript library - a client library to consume the AT&T Enhanced WebRTC API.
* Node.js sample application - a Web app demonstrating the features
of the JavaScript library.   **Please refer to `node-sample/RELEASE.md` for sample app-specific notes**.
* DHS - a Node.js server for managing application assets such as app key and app secret, and generating OAuth access tokens and E911 IDs. **Please refer to [node-dhs/RELEASE.md](node-dhs/RELEASE.md) for DHS-specific notes**.

## Features of the JavaScript library

The following features and functionality are available in the current SDK release for all three supported calling types (AT&T Mobile Number, Virtual Number, and Account ID):

### Chrome v39

*	**Basic audio and video call management** – make, receive, answer, end, mute, unmute, hold, resume, cancel, and reject calls.
*	**Basic audio and video conferencing** – create a conference, add and remove participants, hold, resume, mute, unmute and end conference.
  *	Supports dialing out to add participants.
*	**Advanced call management** – move, transfer, add a second call, switch between two calls.
  *	Audio and video calls can be moved Web-to-Web
  *	Audio calls can be moved from the Web to an AT&T mobile phone


### Firefox v33

*	**Basic audio and video call management** – make, receive, answer, end, mute, unmute, hold, resume, cancel, and reject calls.
*	**Basic audio and video conferencing** – create a conference, add and remove participants, hold, resume, mute, unmute and end conference.
  *	Supports dialing out to add participants.

### Upcoming features

The following features will be added soon:

*	Move a Web video call to an audio call on an AT&T mobile phone
*	DTMF (dialing) tones
*	Upgrade or downgrade between audio and video
*	Firefox browser support

# v1.0.0-rc.10

January 22, 2015

* **Fix:** the `Phone` object will publish an error event on invalid scenarios for second call. The second call feature only supports scenarios that would result in the user having two simple calls, one call in the background (inactive) and one call in the foreground (active). Scenarios that would result in the user having one call and one conference are not supported and thus will generate an error.
* **Fix:** `Phone.transfer` fails with error `Transfer terminated by Network` when the transfer target is an Account ID or Virtual Number user.
* **Fix:** corrects various typos in log statements.
* **Fix:** moving a call fails when the call is put on hold before invoking `Phone.move`.
* **Change:** use short user name on `Phone` events (`event.from` and `event.to`)
  * Account ID: `sip:user@domain.com` => `user`
  * Mobile Number: `sip:1234567890@domain.com` => `1234567890`
  * Virtual User: `tel:+1234567890` => `1234567890`
* **New:** the `Phone` object will publish the `session:expired` event when the library detects that the current session has expired in the server. See the documentation for details in the payload of the event.
* **New:** method `ATT.browser.isNetworkConnected` to check for network connectivity.

## Known Issues

* While using Firefox, when removing a participant from a conference you could see the following error: `ReferenceError: event is not defined sample.js:593`
* While using Firefox, calling a PSTN number could result in the following errors :
  * `Renegotiation of session description is not currently supported. See Bug 840728 for status.` The call is established and the users can hear each other.
  * `Could not negotiate answer SDP; cause = SDP_PARSE_FAILED | SDP Parsing Error: Warning: Unrecognized attribute (ice-mismatch) | SDP Parsing Error: c= connection line not specified for every media level, validation failed.s`. The call is established but the users cannot hear each other.
* Canceling to give consent to a Mobile Number results in redirecting the user to an access denied error page. 
* Resuming a video conference from the participant side results in no video on both host and participant sides. 
* Transferring a call between Mobile Number and Account ID to a Virtual Number, the Virtual Number user will not get the video of the Account ID. 
* Transfer doesn't work if the transferer switched to the first call before transferring the call. 
* A background call will auto resume if the user moves his call to another device. 
* Switching to the background call on Chrome Windows results in no media in the call. 
* Transferring a call fails with HTTP error code `409` when an Account ID user transfers to a Mobile Device. 
* Moving a call from a Mobile Number to a Mobile Device will fail when the call is between Mobile Number and a (non-provisioned) Mobile Device. 
* Adding (non-provisioned) Mobile Device as a participant to a conference results in one way audio with the notification `Media conference forbidden for this recipient`. 
* Adding Account ID participant to a conference when the host is Virtual Number fails with message: `User Not Found`. 
* List of participants is not cleared when ending a conference. 
* `call:move-terminated` event is not fired when successfully completing `phone.move`.
* After successfully adding a Mobile Device to a Conference it will be disconnected after ~24s.
* Adding multiple participants at once using `Phone.addParticipants` method fails with error: `SVC8501:MediaConference ongoing update participant operation.,Variables=`. Use `Phone.addParticipants`
with a single participant ID (Mobile Number, Account ID, Virtual Number) and wait for that participant to
successfully join (i.e., event `conference:invitation-accepted`), then invite the next participant.
* When a participant leaves a conference by using the `endConference` method, the platform does not generate
the necessary event to inform the host.
* When an Mobile Number user rejects an invitation for a conference, sometimes the event `conference:ended` will not
be published due to a bug at the platform level.
* When adding a participant to a conference, sometimes the error: `The requested conference ID <id> was not found.`
is shown.
* Video switching between participants is sometimes inconsistent. Turn off your microphone while the other participant speaks, that will switch the video to the speaking participant.

## Notes

* Establishing calls with Firefox is notably slower than doing so with Chrome.

## Tested Environments

* Chrome Version 39.0 for OSX v10.8.5 and Windows 8
* Firefox Version 33.1 for OSX v10.8.5 and Windows 8

**_The SDK may also work for other Operating Systems, other Browsers but is not tested or supported._**


# Changelog

## v1.0.0-rc.9

December 31, 2014

* Enhancement: added 'session:expired' event to the phone object
* Enhancement: improves call establishment time.
* Change: less verbose logging.
* Change: provide full user name on event data for all phone events.

## v1.0.0-rc.7

### Features

#### Chrome v39

*	Basic audio and video call management – make, receive, answer, end, mute, unmute, hold, resume, cancel, and reject calls
*	Basic audio and video conferencing – create a conference, add and remove participants, hold, resume, mute, unmute and end conference
*	Advanced call management – move, transfer, add a second call, switch between two calls
*	Audio and video calls can be moved browser-to-browser
*	Audio calls can be moved from the browser to an AT&T mobile phone.


#### Firefox v33

*	Basic audio and video call management – make, receive, answer, end, mute, unmute, hold, resume, cancel, and reject calls
*	Basic audio and video conferencing – create a conference, add and remove participants, hold, resume, mute, unmute and end conference