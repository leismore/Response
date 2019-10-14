/**
 * Response class
 *
 * Exit Code:
 *   1 - server_error
 */

import * as express    from 'express';
import {LMError}       from '@leismore/lmerror';
import {Res}           from './type/Res';
import {filter_res}    from './filter_res';
import * as HttpErrors from 'http-errors';

class Response
{
  protected readonly res:express.Response;

  public constructor(res:express.Response)
  {
    this.res = res;
  }

  public send500(error:Error)
  {
    console.error(String(error));
    this.res.sendStatus(500);
    process.exitCode = 1;
  }

  public send(response:Res)
  {
    try
    {
      response = filter_res(response);
    }
    catch (e)
    {
      throw e;
    }
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

  private sendError(error:HttpErrors.HttpError)
  {
    if (error.statusCode === undefined)
    {
      
    }
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





}

export {Response};
