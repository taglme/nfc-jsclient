# Taglme Desktop Javascript SDK

[![Build Status](https://circleci.com/gh/taglme/nfc-jsclient.svg?style=shield)](https://circleci.com/gh/taglme/nfc-jsclient)
[![codecov](https://codecov.io/gh/taglme/nfc-jsclient/branch/master/graph/badge.svg)](https://codecov.io/gh/taglme/nfc-jsclient)
[![release](https://badgen.net/github/tag/taglme/nfc-jsclient)](https://github.com/taglme/nfc-jsclient/releases)

Official open-source Javascript SDK library for [Taglme Desktop](https://github.com/taglme/desktop).
Quick and efficient way to connect applications with NFC REST API server.

### Reference Documentation

This SDK is intended to use in conjunction with Taglme Desktop REST API server. It is a thin API wrapper.
The main goal of the SDK is to handle requests complexity by hiding unnecessary details.

* [REST API specification](https://app.swaggerhub.com/apis-docs/Qwelp/nfcd/0.5) - this is full REST API specification in Swagger (OpenAPI) format. 

### Overview of SDK

SDK consist of several folders

* client - core classes with services. Services are used for communication with server API.
* models - basic types and structs 
* helpers - utils and helpers for various operations
* api - base Api class

#### Overview of API resources

* Adapter - represents a NFC reader. 
* Tag - represents NFC tag. 
* Job - represents a set of operations (steps) that should be performed with tag (read, write, format etc). 
Jobs are added to adapter queue and start execution as soon as tag discovered by adapter.
* JobRun  - represents the result of job execution.
* Event - represents the event generated by the server. 
Events are sent by server through web socket connection. Client should listen for event messages in order to be notified when job execution if finished.

### Opening Issues

If you encounter a bug with the SDK for Javascript we would like to hear about it.
Search the [existing issues](https://github.com/taglme/nfc-jsclient/issues) and see
if others are also experiencing the issue before opening a new issue. Please
include the version of SDK for Javascript, and OS you’re using. Please
also include reproduction case when appropriate.

The GitHub issues are intended for bug reports and feature requests. For help
and questions with using SDK for Javascript please make use of the resources listed
in the Reference Documentation section.
Keeping the list of open issues lean will help us respond in a timely manner.

### Installation

``` npm install nfc-jsclient ```

### Usage

Extended examples in /example folder

```Javascript
import NfcClient from "nfc-jsclient"

//Create new API client
url = "127.0.0.1:3011" // url of the hosted API
locale = "en" // preferred locale to be set on the BE side

client = NfcClient.New(url, locale)

// Request to get About info
client.About.get().then(a => {
    console.log('about info name: ', a.name) // Print received About.Name
});

// Initialize the  WS connection
client.WsService.Connect()

const eHandler = (e) => {
    // handle the received event
}

client.WsService.onEvent(eHandler)

```

### Commands and tools

- `yarn` – install dependencies
    - After dependency installation `yarn` automatically running `postinistall` script
- `yarn build` – Run `typescript` compiler to build distributive files
- `yarn lint` – Run `eslint` to verify proper code style
- `postinstall` – Run `yarn build && yarn lint --fix && yarn test`

- `yarn build-example` – Run `webpack` to build example html + index.ts
- `yarn serve-example` – Run simple static `http-server` from `dist/example` folder
- `example` – Run `yarn && yarn build-example && yarn serve-example`

### License
This SDK is distributed under the MIT license
