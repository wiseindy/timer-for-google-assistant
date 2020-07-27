# Timer for Google Assistant

Built using [NestJS - A progressive Node.js framework](https://nestjs.com/).

## Description

Wouldn't it be cool if you could say stuff like:
* "Hey Google, turn off the lights after 10 minutes"
* "Hey Google, turn off the fan after 25 minutes"
* "Hey Google, turn off &lt;device&gt; after &lt;x&gt; minutes"

Well, this project makes it possible. **Timer for Google Assistant** allows you to send commands to Google Assistant that will execute after a certain time.

This application uses [IFTTT](https://ifttt.com/) to communicate with Google Assistant and your smart device.

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
* `SECURITY_KEY`: Set this to a unique string and do not share it with anyone.
```diff
- IMPORTANT! Make sure you change your SECURITY KEY to something secure.
```
* `IFTTT_EVENT_OFF_SUFFIX`: The suffix for the "off" action in IFTTT. For more details, please view [Integrate with IFTTT](#integrate-with-ifttt) section below.
* `IFTTT_EVENT_ON_SUFFIX`: The suffix for the "off" action in IFTTT. For more details, please view [Integrate with IFTTT](#integrate-with-ifttt) section below.

You can get your IFTTT key from [https://ifttt.com/maker_webhooks](https://ifttt.com/maker_webhooks). Click the **Documentation** button at the top to get your key.

![IFTTT Webhooks page screenshot](/assets/ifttt_maker_webhooks.png?raw=true "IFTTT Webhooks")

![IFTTT Webhooks key page screenshot](/assets/ifttt_maker_webhooks_key.png?raw=true "IFTTT Webhooks key")


### Start the server
```bash
npm start
```

### Integrate with IFTTT
```bash
// To-do
```

You will be creating two actions in IFTTT; one to turn off the device and another to turn it on. 

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

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
