import {InjectionToken} from '@angular/core';
import {CapabilitiesProvider} from './capabilities.provider.model';

export const CAPABILITIES_PROVIDER_TOKEN = new InjectionToken<CapabilitiesProvider>('CapabilitiesProvider');
