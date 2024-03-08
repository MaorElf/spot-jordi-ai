import {Observable} from 'rxjs';

export interface CapabilitiesProvider {
    isCapabilityOn$: (capability: string) => Observable<boolean>;
}
