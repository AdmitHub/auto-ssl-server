import * as libchlngproto from 'libchlngproto';
import { WebApp } from 'meteor/webapp';
import * as bodyParser from 'body-parser';


/**
 * Set up endpoints for Heroku Auto SSL
 *
 * See: https://github.com/admithub/heroku-auto-ssl
 */
WebApp.connectHandlers.use(bodyParser.text());

WebApp.connectHandlers.use('/chlngproto/check', function(req, res) {
  libchlngproto.endpoints.check(req.body, sendFunc(res));
});

WebApp.connectHandlers.use('/chlngproto/post', function(req, res) {
  libchlngproto.endpoints.check(req.body, sendFunc(res));
});

WebApp.connectHandlers.use(function(req, res, next) {
  if (req.url === libchlngproto.currentChallenge.url) {
    res.statusCode = 200;
    res.write(libchlngproto.currentChallenge.content);
    res.end();
  }
  else {
    next();
  }
});

function sendFunc(res) {
  return function(code, body) {
    if (body !== undefined) {
      res.statusCode = code;
      res.write(body);
      res.end();
    }
    res.writeHead(code);
    res.end();
  };
}
