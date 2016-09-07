const libchlngproto = Npm.require("/home/noah/Documents/workspace/admithub/heroku-auto-ssl/libchlngproto");
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
  libchlngproto.endpoints.post(req.body, sendFunc(res));
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
    res.writeHead(code);
    res.end(body);
  };
}
