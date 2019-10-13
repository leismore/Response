/**
 * ResError
 *   1  invalid_http_statusCode
 *   2  invalid_http_header
 *   3  invalid_http_body
 */

import {LMError} from '@leismore/lmerror';

class ResError extends LMError
{
  public constructor(message:string, code:string, previous?:Error)
  {
    super({message:message, code:code}, undefined, previous);
  }
}

export {ResError};
