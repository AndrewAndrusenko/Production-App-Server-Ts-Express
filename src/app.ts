import createError, { HttpError } from 'http-errors'
import express, { Request, Response } from  'express';
import path from 'path';
import cookieParser from 'cookie-parser';
//import logger from 'morgan';

import * as appToServe from './routes/apps-to-serve';
import * as appIndex from './routes/index';

export const app = express();
const expStatGzip = require('express-static-gzip')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expStatGzip(
    path.join(__dirname,'public'),
    {
        enableBrotli:true,
        orderPreference:['br','gz'],
        index: false, // <-- Отключает автоматический перехват index.html
        maxAge: '1y',
        serveStatic: { 
            setHeaders:(res:any, filePath:any) => {
                if (path.basename(filePath) === 'index.html') {
                    res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate')
                } else {
                    res.setHeader('Cache-Control','public, max-age=31536000, immutable')
                }
            }
        }
    } 
))
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use('/apps', appToServe.router);
app.use('/', appIndex.router);

app.use('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.sendStatus(204); 
});
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});