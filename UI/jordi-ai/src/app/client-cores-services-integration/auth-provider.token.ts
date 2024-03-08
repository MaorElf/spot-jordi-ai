import {InjectionToken} from '@angular/core';
import {IAuthProvider} from '@spotinst/spot-client-core-services-types';

export const AUTH_PROVIDER_TOKEN = new InjectionToken<IAuthProvider>('AuthProviderToken');
