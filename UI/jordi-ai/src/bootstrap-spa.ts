import {enableProdMode, NgZone} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NavigationStart, Router} from '@angular/router';
import {singleSpaAngular, getSingleSpaExtraProviders} from 'single-spa-angular';
import {setPublicPath} from 'systemjs-webpack-interop';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {publicApi as clientCoreServices} from 'clientCoreServices';

if (environment.production === true) {
    enableProdMode();
}

setPublicPath('jordiApp');
const MY_STATE: {styles?: HTMLStyleElement[]; links?: HTMLStyleElement[]} = {};
const cssLifecycles = {
    mount:   async() => {
        const headElem = document.getElementsByTagName('head')[0];

        if(Object.keys(MY_STATE).length) {
            for(const styleElem of MY_STATE.styles) {
                headElem.appendChild(styleElem);
            }

            MY_STATE.styles = [];

            for(const linkElem of MY_STATE.links) {
                headElem.appendChild(linkElem);
            }

            MY_STATE.links = [];
        }

        // If your MFE wants to manage the switch account behavior you can set shouldMFEHandleSwitchAccountBS$ value to true
        // And then implement the switch account behavior.
        // While the shouldMFEHandleSwitchAccountBS$ value is false, it means that client-core-services is handling the redirection.
        clientCoreServices.authProvider.shouldMFEHandleSwitchAccountBS$.next(false);
    },
    unmount: async() => {
        const headElem = document.getElementsByTagName('head')[0];

        const styles = Array.from(headElem.getElementsByTagName('style'));
        const links  = Array.from(headElem.getElementsByTagName('link'));

        MY_STATE.styles = [];
        MY_STATE.links  = [];

        for(const style of styles) {
            MY_STATE.styles.push(style);
            headElem.removeChild(style);
        }

        for(const link of links) {
            if(link.type === 'text/css') {
                MY_STATE.links.push(link);
                headElem.removeChild(link);
            }
        }
    }
};

const lifecycles = singleSpaAngular({
    bootstrapFunction: () => {
        return platformBrowserDynamic(getSingleSpaExtraProviders())
			.bootstrapModule(AppModule);
    },
    template: '<spt-jordi-root />',
    Router,
    NgZone,
    NavigationStart
});

export default {
    bootstrap: lifecycles.bootstrap,
    mount:     [cssLifecycles.mount, lifecycles.mount],
    unmount:   [lifecycles.unmount, cssLifecycles.unmount]
};
