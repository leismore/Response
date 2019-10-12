/**
 * Response Class
 * {
 *   res:  Express res
 * }
 *
 * Exit Code:
 *   1 - Server-side error
 */

import * as express from 'express';

class Response
{

  constructor(res: express.Response)
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

  // 403 - Forbidden
  res403()
  {
    this.errorClient(403);
  }

  /**
   * @param  {string[]} allowed - Allowed methods
   */
  res405(allowed)
  {
    this.res.set('Allow', allowed.join(', '));
    this.errorClient(405);
  }

  // 500 - Internal Server Error
  res500(error)
  {
    this.errorServer(500, error);
  }

  // 503 - Service Unavailable
  res503(error)
  {
    this.errorServer(503, error);
  }

  // 204 - No Content
  res204()
  {
    this.res.sendStatus(204);
  }

}

export {Response};
