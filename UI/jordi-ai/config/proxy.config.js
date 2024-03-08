'use strict';
/* eslint-env node */
const fs          = require('fs');
const chokidar    = require('chokidar');
const angularJSON = require('../angular.json');
const _           = require('lodash');

const PORT         = _.get(angularJSON, 'projects.spot-jordi-ai.architect.serve.options.port');
const PUBLIC_PATH  = _.get(angularJSON, 'projects.spot-jordi-ai.architect.serve.options.servePath');
let buildFileNames = fs.readdirSync('build');

chokidar.watch('build', {
    awaitWriteFinish: true
})
        .on('change', () => {
            // eslint-disable-next-line no-console
            console.log(`Build content has been changed, updating the files names`);
            buildFileNames = fs.readdirSync('build');
        });

module.exports = [
    {
        context:     `${PUBLIC_PATH}/main.*.js`,
        pathRewrite: {
            [`^${PUBLIC_PATH}/main.*.js`]: `${PUBLIC_PATH}/main.js`
        },
        target:      `http://localhost:${PORT}`,
        secure:      false,
        logLevel:    'debug'
    },
    {
        context:      function(pathname) {
            return pathname.startsWith(PUBLIC_PATH) === false;
        },
        target:       'https://console.dev.spotinst.com',
        secure:       false,
        changeOrigin: true,
        logLevel:     'debug'
    },
    {
        context:      function(pathname) {
            if(pathname.startsWith(PUBLIC_PATH)) {
                let filename         = pathname.slice(PUBLIC_PATH.length + 1);
                let isFileNameExists = buildFileNames.includes(filename);

                return isFileNameExists === false;
            }
        },
        target:       `https://console.dev.spotinst.com`,
        secure:       false,
        changeOrigin: true,
        logLevel:     'debug'
    }
];
