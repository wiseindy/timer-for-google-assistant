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
$ git clone https://github.com/wiseindy/timer-for-google-assistant.git
```

### Enter the directory and run `npm install`

```bash
$ cd timer-for-google-assistant
$ npm install
```

### Create a `.env` file in the root directory. Sample values can be seen in `.env.example`
```bash
PORT=3000
SECURITY_KEY=ChangeThisToSomethingSecure
IFTTT_EVENT_OFF_SUFFIX=_off
IFTTT_EVENT_ON_SUFFIX=_on
IFTTT_EVENT_KEY=xxxxxxxxxxxxxxxxxxxxxx
```
You can get your IFTTT key from [https://ifttt.com/maker_webhooks](https://ifttt.com/maker_webhooks). Click the **Documentation** button at the top to get your key.

<span style="color:red">**IMPORTANT!**</span> Make sure you change your **SECURITY KEY** to something secure.

### Start the server
```bash
npm start
```

### Integrate with IFTTT
```bash
// To-do
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Wiseindy](https://wiseindy.com)
- Website - [https://wiseindy.com](https://wiseindy.com/)
- Twitter - [@wiseindy](https://twitter.com/wiseindy)

## License

  **Timer for Google Assistant** is [MIT licensed](LICENSE).
