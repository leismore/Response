/**
 * Response class
 *
 * Exit Code:
 *   1 - server_error
 *
 * Error
 *   invalid_http_statusCode
 *   invalid_http_header
 *   invalid_http_body
 */

import * as express    from 'express';
import {LMError}       from '@leismore/lmerror';
import {Res}           from './type/Res';
import {ptnStatusCode} from './patterns';

abstract class Response
{
  protected readonly res:express.Response;

  public constructor(res:express.Response)
  {
    this.res   = res;
  }

  public sendErr(error:Error)
  {

    if (error instanceof LMError)
    {
      this.sendLMError(error);
    }
    else
    {
      this.sendError(error);
    }
  }

  public send(response:Res)
  {
    if (response.headers !== undefined)
    {
      this.res.set(response.headers);
    }
    if (response.body === undefined || response.body === null)
    {
      this.res.sendStatus(Number(response.statusCode));
    }
    else
    {
      this.res.status(Number(response.statusCode)).send(response.body);
    }
  }

  private sendLMError(error:LMError)
  {
    if (error.response === undefined)
    {
      this.send500(error);
      return;
    }
    if (Number(error.response.statusCode) <= 500 && Number(error.response.statusCode) <= 599)
    {
      console.error(String(error));
    }
    if (error.response.headers !== undefined)
    {
      this.res.set(error.response.headers);
    }
    if (error.response.body === undefined || error.response.body === null)
    {
      this.res.sendStatus(Number(error.response.statusCode));
    }
    else
    {
      this.res.status(Number(error.response.statusCode)).send(error.response.body);
    }
  }

  private sendError(error:any)
  {
    let statusCode:string;
    if (error.statusCode !== undefined)
    {
      statusCode = error.statusCode;
      this.res.sendStatus(Number(statusCode));
      return;
    }
    else if (error.status !== undefined)
    {
      statusCode = error.status;
      this.res.sendStatus(Number(statusCode));
      return;
    }
    else
    {
      this.send500(error);
    }
  }

  public send500(error:Error)
  {
    console.error(String(error));
    this.res.sendStatus(500);
    process.exitCode = 1;
  }







}

export {Response};
