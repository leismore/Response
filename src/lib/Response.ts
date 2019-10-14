/**
 * Response class
 *
 * Exit Code:
 *   1 - server_error
 */

import {Response as ResExpress} from 'express';
import {LMError}                from '@leismore/lmerror';
import {Res as ResType}         from './type/Res';
import {filter_res}             from './filter_res';
import {HttpError}              from 'http-errors';

class Response
{
  protected readonly res:ResExpress;

  public constructor(res:ResExpress)
  {
    this.res = res;
  }

  /**
   * Send HTTP response
   * @param   response   - HTTP response data
   * @throw   {ResError} - 1/2/3
   */
  public send(response:ResType):void
  {
    try
      { response = filter_res(response); }
    catch (e)
      { throw e; }
    if (response.headers !== undefined)
      { this.res.set(response.headers); }
    if (response.body === undefined || response.body === null)
      { this.res.sendStatus(Number(response.statusCode)); }
    else
      { this.res.status(Number(response.statusCode)).send(response.body); }
  }

  public sendERROR(error:Error):void
  {
    if (error instanceof LMError)
      { this.sendLMError(error); }
    else if (error instanceof HttpError)
      { this.sendHttpError(error); }
    else
      { this.sendError(error); }
  }

  private sendError(error:Error):void
  {
    let now = new Date();
    console.error( now.toISOString() + ' - ' + String(error) );
    this.res.sendStatus(500);
    process.exit(1);
  }

  private sendHttpError(error:HttpError):void
  {
    let now = new Date();
    if (error.statusCode >= 500 && error.statusCode <= 599)
      { console.error( now.toISOString() + ' - ' + String(error) ); }
    if (error.headers !== undefined)
      { this.res.set(error.headers); }
    if (error.expose === true)
      { this.res.status(error.statusCode).send(error.message); }
    else
      { this.res.sendStatus(error.statusCode); }
    if (error.statusCode >= 500 && error.statusCode <= 599)
      { process.exit(1); }
  }

  private sendLMError(error:LMError):void
  {
    if (error.response === undefined)
    {
      console.error( String(error) );
      this.res.sendStatus(500);
      process.exit(1);
    }
    else
    {
      if ( Number(error.response.statusCode) >= 500 && Number(error.response.statusCode) <= 599 )
        { console.error(String(error)); }
      if (error.response.headers !== undefined)
        { this.res.set(error.response.headers); }
      if (error.response.body === undefined || error.response.body === null)
        { this.res.sendStatus(Number(error.response.statusCode)); }
      else
        { this.res.status(Number(error.response.statusCode)).send(error.response.body); }
      if ( Number(error.response.statusCode) >= 500 && Number(error.response.statusCode) <= 599 )
        { process.exit(1); }
    }
  }

}

export {Response};
