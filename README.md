# NFC Client

Open-Source Go library for quick and efficient work with NFC REST API.

### Installation

``` npm install nfc-jsclient ```

### Usage

```Javascript
import NfcClient from "nfc-jsclient"

url = "http://127.0.0.1:3011" // url of the hosted API
locale = "en" // preferred locale to be set on the BE side

client = NfcClient.New(url, locale)

// Request to get About info
client.About.get().then(a => {
    console.log('about info name: ', a.name) // Print received About.Name
});
```

#### WS

WS connection is a part of the library functionality via which you are able to receive Events.

```Javascript
// Initialize the  WS connection
client.WsService.Connect()

const eHandler = (e) => {
    // handle the received event
}

client.WsService.onEvent(eHandler)
```

Also you are able to handle errors in a similar manner

```Javascript
const errHandler = (e) => {
    // handle the received error
}

client.Ws.onError(eHandler)
```
