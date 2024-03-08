'use strict';
/* eslint-env node */
const {execSync} = require('child_process');
const readline = require('readline');
const regexExpForPortNumber = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi;

const exec = commands => {
    execSync(commands, {
        stdio: 'inherit',
        shell: true
    });
};

const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

function serveWithLocalClientBackend() {
    return new Promise((resolve) => {
        rl.question('Enter local client-backend port number: \n', portNumber => {
            let isValidPortNumber = regexExpForPortNumber.test(portNumber) && portNumber !== '';

            if(isValidPortNumber) {
                rl.close();
                resolve(portNumber);
            }
            else {
                // eslint-disable-next-line no-console
                console.log('Received bad port number, try again!');
                resolve(serveWithLocalClientBackend());
            }
        });
    });
}

serveWithLocalClientBackend().then(portNumber => {
    // eslint-disable-next-line no-console
    console.log(`Connecting to client-backend on: http://localhost:${portNumber}`);

    // exec(`npm --clientBackendPortNumber=${portNumber} run-script serve-local-client-backend`);
    exec(`npm --clientBackendPortNumber=${portNumber} run-script ng serve -- --proxy-config config/proxyWithLocalClientBackend.config.js`);
});

