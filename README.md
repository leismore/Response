**OBSOLETED PACKAGE!!! Please use [@leismore/lmos-nodejs-lmresponse](https://github.com/leismore/lmos-nodejs-lmresponse) instead!!!**






# Response Class

Response class - A HTTP Response class for LMOS NodeJS projects.

# Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Installation

`npm install @leismore/response`

## Test

`npm test`

## Example

```typescript
import { LMResponse, LMResponseData } from '@leismore/response';

// In Express.js routing handler
function(req, res, next)
{
  const resp = new LMResponse(res);

  let data:LMResponseData = {statusCode: '200', headers: {'Content-Type': 'application/json'}, body: {'result': 'OK'}};
  resp.send(data);
}

// In Express.js error handler
function(error, req, res, next)
{
  const resp = new LMResponse(res);
  resp.sendERROR(error);
}
```

## API

```typescript
LMResponse
{
  protected readonly res:ResExpress;  // Response in Express.js

  public constructor(res:ResExpress)  // Response in Express.js

 /**
   * Send HTTP response
   * @param   response   - HTTP response data
   * @throw   {LMResponseError} - 1/2/3
   */
  public send(response:LMResponseData):void
  
  public sendERROR(error:Error):void
}

/**
 * LMResponseError
 *   1  invalid_http_statusCode
 *   2  invalid_http_header
 *   3  invalid_http_body
 */
LMResponseError extends LMError
{
  public constructor(message:string, code:string, previous?:Error)
}

type LMResponseData = {                                 // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
```

Refer to [LMError / @leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror).

## License

GNU Affero General Public License v3.0

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / Sep 04, 2019)
