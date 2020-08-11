![Timer for Google Assistant](/assets/timer-for-google-assistant.png?raw=true "Timer for Google Assistant")

<p align="center">
  <a href="https://hub.docker.com/r/wiseindy/timer-for-google-assistant">
    <img src="https://img.shields.io/docker/cloud/automated/wiseindy/timer-for-google-assistant" />
  </a>
  <a href="https://hub.docker.com/r/wiseindy/timer-for-google-assistant">
    <img src="https://img.shields.io/docker/cloud/build/wiseindy/timer-for-google-assistant" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/wiseindy/timer-for-google-assistant" />
  </a>
  <a href="https://github.com/wiseindy/timer-for-google-assistant/stargazers">
    <img src="https://img.shields.io/github/stars/wiseindy/timer-for-google-assistant?style=social" />
  </a>
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/wiseindy" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
</p>

## Description

Wouldn't it be cool if you could say stuff like:

* *"Hey Google, turn off the lights after 10 minutes"*
* *"Hey Google, turn on the fan for 25 minutes"*
* *"Hey Google, turn off &lt;device&gt; after &lt;x&gt; minutes"*

Well, this project makes it possible. **Timer for Google Assistant** allows you to send commands to Google Assistant that will execute after a certain time.

## How does it work?

**Timer for Google Assistant** provides a simple API with which you can schedule commands. See [API Reference](#api-reference) below.

This application is built using [NestJS - A progressive Node.js framework](https://nestjs.com/).
It uses [IFTTT](https://ifttt.com/) to communicate with Google Assistant and your smart device.

There are 2 ways to set it up:

1. [Install using Docker](#install-using-docker) (recommended)
2. [Manual installation without Docker](#manual-installation-without-docker)

## API Reference

### Usage

 `POST /trigger`

### Request body

Content type: `application/json`
| Name                    | Type      | Required | Default value | Description                                                                                            |
|:------------------------|:----------|:---------|:--------------|:-------------------------------------------------------------------------------------------------------|
| *key*                   | `string`  | **Yes**  | -             | This key can be any value, however, it should the match the key specified while setting up the server. |
| *durationInMinutes*     | `number`  | **Yes**  | -             | Number of minutes after which the action should be triggered.                                          | 
| *deviceName*            | `string`  | **Yes**  | -             | Name of the target device.                                                                             |
| *targetState*           | `boolean` | No       | `false`       | What should the state of the device be *after* firing the event? `true` = ON; `false` = OFF            | 

#### Example

Making a `POST` request with the parameters below will set the `lights` to `OFF` after `20` minutes.

``` json
{
  "key":"ChangeThisToSomethingSecure",
  "durationInMinutes":20,
  "deviceName":"lights",
  "targetState":false
}
```

#### A note on the `targetState` parameter

If `targetState` is set to `false` (i.e., OFF), the device will be first turned `ON` upon receiving this command. After the specified time has elapsed, the device will be turned `OFF`. This is an optional parameter and by default, `targetState` is `false`.

If `targetState` is set to `true` (i.e., ON), it will do the opposite. The device will be first turned `OFF` upon receiving this command. After the specified time has elapsed, the device will be turned `ON`. 


## Install using Docker

**Timer for Google Assistant** is available as a [Docker image](https://hub.docker.com/r/wiseindy/timer-for-google-assistant).

### Prerequisites

* An internet facing server (so that IFTTT can make requests to your server)
* [Docker](https://www.docker.com/) installed on this server.

#### Running with `docker`

Run the following command on your server to get this application up and running. The application runs on port `3000` internally. The command below makes the API available externally on port `3020`.

[For information on what the environment variables mean, see this section below.](#create-a-env-file-in-the-root-directory-sample-values-can-be-seen-in-envexample)

```bash
docker run \
  -e SECURITY_KEY="ChangeThisToSomethingSecure" \
  -e IFTTT_EVENT_OFF_SUFFIX="_off" \
  -e IFTTT_EVENT_ON_SUFFIX="_on" \
  -e IFTTT_EVENT_KEY="xxxxxxxxxxxxxxxxxxxxxx" \
-p 3020:3000 wiseindy/timer-for-google-assistant
```

You can also specify the environment variables in a separate file, for example, `my_env_data`.

```
SECURITY_KEY=ChangeThisToSomethingSecure
IFTTT_EVENT_OFF_SUFFIX=_off
IFTTT_EVENT_ON_SUFFIX=_on
IFTTT_EVENT_KEY=xxxxxxxxxxxxxxxxxxxxxx
```

Now you can use a simpler command:

```bash
docker run --env-file ./my_env_data -p 3020:3000 wiseindy/timer-for-google-assistant
```

#### Running with `docker-compose`

If using docker compose, download the [sample `docker-compose.yml` in this project](docker-compose.yml). Set the environment variables under the `environment` section to appropriate values.

```yaml
    ...
    environment:
      - SECURITY_KEY=ChangeThisToSomethingSecure
      - IFTTT_EVENT_OFF_SUFFIX=_off
      - IFTTT_EVENT_ON_SUFFIX=_on
      - IFTTT_EVENT_KEY=xxxxxxxxxxxxxxxxxxxxxx
    ...
```

[For information on what the environment variables mean, see this section below.](#create-a-env-file-in-the-root-directory-sample-values-can-be-seen-in-envexample)

To start the server, run:

```bash
docker-compose up -d
```

To stop, run:

```bash
docker-compose down
```

Next, you'll need to set up triggers and actions in IFTTT. [Jump to section](#integrate-with-ifttt).

## Manual installation without Docker

### Prerequisites

* An internet facing web server (so that IFTTT can make requests to your server)
* [NodeJS](https://nodejs.org/en/) 12.18.3 or higher (lower versions may also work, but I haven't tested it)
* An [IFTTT](https://ifttt.com/) account

## Installation

### Clone this repository

``` bash
git clone https://github.com/wiseindy/timer-for-google-assistant.git
```

### Enter the directory and run `npm install`

``` bash
cd timer-for-google-assistant
npm install
```

### Create a `.env` file in the root directory. Sample values can be seen in `.env.example`

``` bash
PORT=3020
SECURITY_KEY=ChangeThisToSomethingSecure
IFTTT_EVENT_OFF_SUFFIX=_off
IFTTT_EVENT_ON_SUFFIX=_on
IFTTT_EVENT_KEY=xxxxxxxxxxxxxxxxxxxxxx
```

* `PORT` : (DEFAULT: `3000`, if not specified) This is the port number the application will use. You'll need to add this exception to your firewall rule. You can also use a reverse proxy.
* `SECURITY_KEY` : (REQUIRED) Set this to a **unique** string and **do not share it with anyone**.
``` diff
- IMPORTANT! Make sure you change your SECURITY KEY to something secure and DO NOT use the default value.
```
* `IFTTT_EVENT_OFF_SUFFIX` : (REQUIRED) The suffix for the "off" action in IFTTT. For more details, please view [Integrate with IFTTT](#integrate-with-ifttt) section below.
* `IFTTT_EVENT_ON_SUFFIX` : (REQUIRED) The suffix for the "on" action in IFTTT. For more details, please view [Integrate with IFTTT](#integrate-with-ifttt) section below.
* `IFTTT_EVENT_KEY` : (REQUIRED) You can get your IFTTT key from [https://ifttt.com/maker_webhooks](https://ifttt.com/maker_webhooks). Click the **Documentation** button at the top to get your key.\
\
![IFTTT Webhooks page screenshot](/assets/ifttt_maker_webhooks.png?raw=true "IFTTT Webhooks")
\
![IFTTT Webhooks key page screenshot](/assets/ifttt_maker_webhooks_key.png?raw=true "IFTTT Webhooks key")

### Build the application

```bash
npm run build
```

### Start the application

``` bash
npm run start:prod
```

For more options, view [Running the app](#running-the-app) section.

---

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

5. Fill the action fields with the following values. For more information, refer to the [API Reference](#api-reference) below.\
\
For the `URL` field, type in the domain/IP of your webserver running this application.\
The API endpoint that handles requests is `/trigger`.\
Set the web request method to `POST`.\
Select `application/json` as Content Type.\
For the Body parameter, specify the following values:\
\
![IFTTT web request action](/assets/ifttt_webhooks_make_http_request.png?raw=true "IFTTT web request action")

Sample request body:

``` 
{
  "key":"ChangeThisToSomethingSecure",
  "durationInMinutes":{{NumberField}},
  "deviceName":"lights"
}
```

* Make sure to use the same `key` that you specified in the `.env` file.
* The device name `lights` should match the name used to create OFF/ON events: `lights_off` and `lights_on`. These values are case-sensitive.

---

## Running the app

``` bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

That's it! Try saying *"Hey Google, turn on the lights for 2 minutes."* and if everything is setup right, Google Assistant will turn ON your lights and after two minutes, it should turn them OFF.

## Test

``` bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Support

<a href="https://www.buymeacoffee.com/wiseindy" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

## Author

* Website - [https://wiseindy.com](https://wiseindy.com/)
* Twitter - [@wiseindy](https://twitter.com/wiseindy)

## License

  **Timer for Google Assistant** is [MIT licensed](LICENSE).
  
  All trademarks are the property of their respective owners.
