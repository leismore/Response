# Response Class

Response class - A HTTP Response class for LMOS NodeJS projects.

# Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Installation

`npm install @leismore/response`

## Example

```typescript
import {Response} from '@leismore/response';
// or
const Response = require('@leismore/response').Response;

// In Express.js routing handler
function(req, res, next)
{
  const resp = new Response(res);

  let data = {statusCode: '200', headers: {'Content-Type': 'application/json'}, body: {'result': 'OK'}};
  resp.send(data);
}

// In Express.js error handler
function(error, req, res, next)
{
  const resp = new Response(res);
  resp.sendERROR(error);
}
```

## API

```typescript
Response
{
  protected readonly res:ResExpress;  // Response in Express.js

  public constructor(res:ResExpress)  // Response in Express.js
  public send(response:ResType):void
  public sendERROR(error:Error):void
}

type Res = {                                            // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
```

## License

MIT

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / Sep 04, 2019)
