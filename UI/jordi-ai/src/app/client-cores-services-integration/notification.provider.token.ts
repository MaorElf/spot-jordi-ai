import {InjectionToken} from '@angular/core';
import {INotificationProvider} from '@spotinst/spot-client-core-services-types';

export const NOTIFICATION_PROVIDER_TOKEN = new InjectionToken<INotificationProvider>('NotificationProviderToken');
