import {app}  from '../app'
import {ENV} from '../env/env'
import http from 'http';
import { HttpError } from 'http-errors';

var port = normalizePort(process.env.PORT || ENV.MAIN_PROD_PORT);
console.log('port',port);
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);

function normalizePort(val:string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}


function onError(error:HttpError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}