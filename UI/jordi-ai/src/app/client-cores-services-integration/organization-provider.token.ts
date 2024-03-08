import {InjectionToken} from '@angular/core';
import {IOrganizationProvider} from '@spotinst/spot-client-core-services-types';

export const ORGANIZATION_PROVIDER_TOKEN = new InjectionToken<IOrganizationProvider>('OrganizationProvider');
