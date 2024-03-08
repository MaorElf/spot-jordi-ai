import {InjectionToken} from '@angular/core';
import {
    IHeaderCommunicationProvider
} from '@spotinst/spot-client-core-services-types';

export const HEADER_COMMUNICATION_PROVIDER_TOKEN = new InjectionToken<IHeaderCommunicationProvider>('HeaderCommunicationProviderToken');
