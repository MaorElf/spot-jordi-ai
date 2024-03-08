'use strict';
// eslint-disable-next-line filenames/match-regex
/* eslint-env node */
const baseProxy = require('./proxy.config');

let extendedProxy=[{
    context:      function(pathname) {
        return pathname.startsWith('/api') === true;
    },
    target:       `http://localhost:${process.env.npm_config_clientBackendPortNumber}`,
    secure:       false,
    changeOrigin: true,
    logLevel:     'debug'
}];

function mergeProxyConfigurations() {
    const retVal=[...extendedProxy, ...baseProxy];

    return retVal;
}

module.exports = mergeProxyConfigurations();
