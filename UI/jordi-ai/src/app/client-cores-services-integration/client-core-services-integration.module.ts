import {NgModule} from '@angular/core';
import {publicApi as clientCoreServices} from 'clientCoreServices';
import {
    HEADER_COMMUNICATION_PROVIDER_TOKEN as SCS_HEADER_COMMUNICATION_PROVIDER_TOKEN,
    NAVBAR_COMMUNICATION_PROVIDER_TOKEN,
    SCS_AUTH_PROVIDER_TOKEN,
    SCS_NOTIFICATION_PROVIDER_TOKEN,
    SCS_ORGANIZATION_PROVIDER_TOKEN,
    SCS_LOGGER_PROVIDER_TOKEN,
    APP_NAME_PROVIDER_TOKEN, SCS_CAPABILITIES_PROVIDER_TOKEN
} from '@spotinst/spot-client-shared';
import {AUTH_PROVIDER_TOKEN} from './auth-provider.token';
import {NOTIFICATION_PROVIDER_TOKEN} from './notification.provider.token';
import {HEADER_COMMUNICATION_PROVIDER_TOKEN} from './header-communication-provider.token';
import {LOGGER_PROVIDER_TOKEN} from './logger-provider.token';
import {CAPABILITIES_PROVIDER_TOKEN} from './capabilities.provider.token';
import {ORGANIZATION_PROVIDER_TOKEN} from "./organization-provider.token";

@NgModule({
    providers: [
        {
            provide:    CAPABILITIES_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.capabilitiesProvider
        },
        {
            provide:    SCS_CAPABILITIES_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.capabilitiesProvider
        },
        {
            provide:    AUTH_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.authProvider
        },
        {
            provide:    SCS_AUTH_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.authProvider
        },
        {
            provide:    SCS_ORGANIZATION_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.organizationProvider
        },
        {
            provide:    SCS_HEADER_COMMUNICATION_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.headerCommunicationProvider
        },
        {
            provide:    HEADER_COMMUNICATION_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.headerCommunicationProvider
        },
        {
            provide:    NAVBAR_COMMUNICATION_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.navbarCommunicationProvider
        },
        {
            provide:    NOTIFICATION_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.notificationProvider
        },
        {
            provide:    SCS_NOTIFICATION_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.notificationProvider
        },
        {
            provide:    LOGGER_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.loggerProvider
        },
        {
            provide:    SCS_LOGGER_PROVIDER_TOKEN,
            useFactory: () => clientCoreServices.loggerProvider
        },
        {
            provide:    APP_NAME_PROVIDER_TOKEN,
            useValue:   'spot-jordi-ai'
        }
    ]
})
class ClientCoreServicesIntegrationModule {
}

export {ClientCoreServicesIntegrationModule};
