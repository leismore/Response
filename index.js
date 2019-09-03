/**
 * Response Class
 * {
 *   res:  Express res
 * }
 *
 * Exit Code:
 *   1 - Server-side error
 */

'use strict';

module.exports = class Response
{

  constructor(res)
  {
    Object.defineProperty(this, 'res', {
      value:        res,
      writable:     false,
      enumerable:   false,
      configurable: false
    });
  }

  errorServer(statusCode, error)
  {
    console.error(error);
    this.res.sendStatus(statusCode);
    process.exitCode = 1;
  }

  errorClient(statusCode)
  {
    this.res.sendStatus(statusCode);
  }

  // 500 - Internal Server Error
  res500(error)
  {
    this.errorServer(500, error);
  }

  // 204 - No Content
  res204()
  {
    this.res.sendStatus(204);
  }

};
