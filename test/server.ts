import express = require('express');
import { LMResponse as Resp, LMResponseData as RespData, LMResponseError as RespError } from '../src/index';
import { LMError } from '@leismore/lmerror';
import createHttpError = require('http-errors');

const app  = express();
const port = 8080;

// Response: success
app.get('/success', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const resp = new Resp(res);
  let data:RespData = {statusCode: '200', headers: {'Content-Type': 'application/json'}, body: {'result': 'OK'}};
  resp.send(data);
});

// Response: failure
app.get('/failure', (req:express.Request, res:express.Response, next:express.NextFunction)=>{
  const resp = new Resp(res);
  let data:RespData = { statusCode: 'a3', headers:{'Content-Type': ''} };
  resp.send(data);
});

// Response: Error
app.get('/error', (req:express.Request, res:express.Response, next:express.NextFunction)=>{
  throw new Error('standard Error');
});

// Response: LMError
app.get('/lmerror', (req:express.Request, res:express.Response, next:express.NextFunction)=>{
  throw new LMError({message: 'LMError message', code: 'lmerror_01'}, 
    { statusCode:'500',
      headers:{'Content-Type': 'application/json'},
      body:{message:'LMError message'}
    });
});

// Response: HttpError
app.get('/httperror', (req:express.Request, res:express.Response, next:express.NextFunction)=>{
  let e = createHttpError(400, 'HttpError message', 
    { expose: true,
      headers: {'content-type':'text/plain'},
      message:'HttpError message'
    });
  throw e;
});

app.use((error:Error, req:express.Request, res:express.Response, next:express.NextFunction)=>{
  const resp = new Resp(res);
  if (res.headersSent) {
    next(error);
    return;
  }
  resp.sendERROR(error);
});

app.listen(port, () => {
  console.log(`@leismore/response testing server, listening at http://localhost:${port}`);
});
