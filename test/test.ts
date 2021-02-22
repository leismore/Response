import { assert } from 'chai';
import axios from 'axios';

describe('Response Class', function(){
    it('The server should returns {result: OK} (application/json)', function(){
        return axios.get('http://localhost:8080/success').then(res=>{
            assert( (String(res.headers['content-type']).includes('application/json') &&
              res.data.result === 'OK'), 'Returns incorrect content' );
        }).catch(e=>{
            assert(false, 'Returns failure');
        });
    });
});

