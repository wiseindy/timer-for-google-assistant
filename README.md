# Timer for Google Assistant

Wouldn't it be cool if you could say stuff like:
* *"Hey Google, turn off the lights after 10 minutes"*
* *"Hey Google, turn on the fan for 25 minutes"*
* *"Hey Google, turn off &lt;device&gt; after &lt;x&gt; minutes"*

Well, this project makes it possible. **Timer for Google Assistant** allows you to send commands to Google Assistant that will execute after a certain time.

## Description

This application was built using [NestJS - A progressive Node.js framework](https://nestjs.com/).

It uses [IFTTT](https://ifttt.com/) to communicate with Google Assistant and your smart device.

## Prerequisites

* An internet facing web server (so that IFTTT can make requests to your server)
* [NodeJS](https://nodejs.org/en/) 12.18.3 or higher (lower versions may also work, but I haven't tested it)
* An [IFTTT](https://ifttt.com/) account

## Installation

### Clone this repository
```bash
git clone https://github.com/wiseindy/timer-for-google-assistant.git
```

### Enter the directory and run `npm install`

```bash
cd timer-for-google-assistant
npm install
```

### Create a `.env` file in the root directory. Sample values can be seen in `.env.example`
```bash
PORT=3000
SECURITY_KEY=ChangeThisToSomethingSecure
IFTTT_EVENT_OFF_SUFFIX=_off
IFTTT_EVENT_ON_SUFFIX=_on
IFTTT_EVENT_KEY=xxxxxxxxxxxxxxxxxxxxxx
```
* `PORT`: This is the port number the application will use. You'll need to add this exception to your firewall rule. You can also use a reverse proxy.
* `SECURITY_KEY`: Set this to a **unique** string and **do not share it with anyone**.
```diff
- IMPORTANT! Make sure you change your SECURITY KEY to something secure and DO NOT use the default value.
```
* `IFTTT_EVENT_OFF_SUFFIX`: The suffix for the "off" action in IFTTT. For more details, please view [Integrate with IFTTT](#integrate-with-ifttt) section below.
* `IFTTT_EVENT_ON_SUFFIX`: The suffix for the "off" action in IFTTT. For more details, please view [Integrate with IFTTT](#integrate-with-ifttt) section below.
* `IFTTT_EVENT_KEY`: You can get your IFTTT key from [https://ifttt.com/maker_webhooks](https://ifttt.com/maker_webhooks). Click the **Documentation** button at the top to get your key.\
\
![IFTTT Webhooks page screenshot](/assets/ifttt_maker_webhooks.png?raw=true "IFTTT Webhooks")\
\
![IFTTT Webhooks key page screenshot](/assets/ifttt_maker_webhooks_key.png?raw=true "IFTTT Webhooks key")

### Integrate with IFTTT

You will be creating two actions in IFTTT; one to turn off the device and another to turn it on. 

Both these actions/applets will work by receiving a web request and triggering the device ON or OFF (using IFTTT's Webhooks feature).

#### Set up webhooks

1. Login to your [IFTTT](https://ifttt.com/) and create a new applet. For the `this` trigger, choose `Webhooks`.\
\
![IFTTT create a new applet](/assets/ifttt_webhooks_create.gif?raw=true "IFTTT create a new applet")

2. Follow a consistent naming scheme for all events. Use the correct suffixes for your device events as specified in the `IFTTT_EVENT_OFF_SUFFIX` and `IFTTT_EVENT_ON_SUFFIX` parameters in the `.env` file above.\
\
For example, if the device is a smart light, use `lights_off` and `lights_on` as the event names to turn the light OFF and ON respectively. DO NOT use inconsistent names like `lights_off` and `LIGHT_ON`.\
\
**Make sure you follow the SAME naming scheme for ALL events (they're case sensitive)**. \
\
![IFTTT name your event](/assets/ifttt_webhooks_trigger_event_name.gif?raw=true "IFTTT name your event")

3. Next, choose your smart device from the list and select the action you'd like to carry out.\
\
![IFTTT set event target](/assets/ifttt_webhooks_trigger_event_target.gif?raw=true "IFTTT set event target")

4. Repeat the above steps to create the `ON` trigger for your device.

#### Configure IFTTT to receive commands from Google Assistant and forward to your server

1. Create a new applet/action in IFTTT. For the `this` trigger, choose `Google Assistant`.\
\
![IFTTT create a new Google Assistant applet](/assets/ifttt_webhooks_create_google_assistant.gif?raw=true "IFTTT create a new Google Assistant applet")

2. Select **Say a phrase with a number**\
\
![IFTTT Google Assistant applet](/assets/ifttt_google_assistant.gif?raw=true "IFTTT Google Assistant applet")

3. Set your trigger phrase and the response. In this example, I want Google Assistant to turn on the lights and then turn it off after X minutes. Use `#` to specify where you'll say the number of minutes.\
\
![IFTTT Google Assistant number trigger](/assets/ifttt_google_assistant_number_trigger.png?raw=true "IFTTT Google Assistant number trigger")

4. For the `that` action in your applet, select `Webhooks`. This will be used to make a web request to your server.\
\
![IFTTT set target to webhooks web request](/assets/ifttt_google_assistant_trigger_event_target.gif?raw=true "IFTTT set target to webhooks web request")

5. For the URL field, type in the domain/IP of your webserver running this application.\
\
The API endpoint that handles requests is `/trigger`.
Set the web request method to `POST`.\
Select `application/json` as Content Type.\
For the Body parameter, specify the following values:\
\
![IFTTT web request action](/assets/ifttt_webhooks_make_http_request.png?raw=true "IFTTT web request action")

```json
{
  "key":"ChangeThisToSomethingSecure",
  "durationInMinutes":"{{NumberField}}",
  "deviceName":"lights"
}
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

That's it! Try saying *"Hey Google, turn on the lights for 2 minutes."* and if everything is setup right, Google Assistant will turn ON your lights and after two minutes, it should turn them OFF.

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Stay in touch

- Author - [Wiseindy](https://wiseindy.com)
- Website - [https://wiseindy.com](https://wiseindy.com/)
- Twitter - [@wiseindy](https://twitter.com/wiseindy)

## License

  **Timer for Google Assistant** is [MIT licensed](LICENSE).
  
  All trademarks are the property of their respective owners.
