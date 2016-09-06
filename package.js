Package.describe({
  name: 'admithub:auto-ssl-server',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript'
  ], 'server');

  api.addFiles([
    'lib/api.js'
  ], 'server');
});

Npm.depends({
  'qs': '6.2.1',
  'openpgp': '2.3.3',
  'body-parser': '1.15.2',
  'libchlngproto': '1.4.3'
});