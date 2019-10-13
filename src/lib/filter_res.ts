/**
 * filter_res function - Test and normalize type Res (HTTP response data).
 * @param  {Res}      res
 * @return {Res}
 * @throw  {ResError}      1 / 2 / 3
 */

import {Res}           from './type/Res';
import {ptnStatusCode} from './patterns';
import {ResError}      from './ResError';

function filter_res(res:Res):Res
{
  if (ptnStatusCode.test(res.statusCode) === false)
  {
    throw new ResError('invalid_http_statusCode', '1');
  }

  if (res.headers === undefined || res.headers=== {})
  {
    res.headers = undefined;
  }
  else
  {
    for (let k in res.headers)
    {
      if (k.length === 0 || res.headers[k].length === 0)
      {
        throw new ResError('invalid_http_header', '2');
      }
    }
  }

  return res;
}

export {filter_res};
