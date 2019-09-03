# Response Class

A HTTP server response class for NodeJS.

## Installation

`npm install @leismore/response`

## Example

```javascript
let resp = require('@leismore/response');
    resp = new resp(res);
let error = new Error('Some error');

resp.errorServer(500, error);
resp.errorClient(415);
```

## Data Structure

```
{
  res: Express Response Object
}
```

## Methods

### constructor

`constructor(res)`

* res: Express Response Object

### errorServer

`errorServer(statusCode, error)`

* statusCode: HTTP status code
* error:      Error object

### errorClient

`errorClient(statusCode)`

* statusCode: HTTP status code

### res500

`res500(error)`

* error:      Error object

### res204

`res204()`

## License

MIT

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / Sep 04, 2019)
