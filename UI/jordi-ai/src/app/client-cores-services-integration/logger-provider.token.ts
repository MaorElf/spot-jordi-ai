import {InjectionToken} from '@angular/core';
import {ILoggerProvider} from '@spotinst/spot-client-core-services-types';

export const LOGGER_PROVIDER_TOKEN = new InjectionToken<ILoggerProvider>('LoggerProviderToken');
