import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {DemoLoginRequest} from './demo.actions';
import {AuthData} from '@spotinst/spot-client-shared';

@Injectable()
export class DemoProvider {

    constructor(private store: Store) {
    }

    requestLogin(authData: AuthData): void {
        this.store.dispatch(new DemoLoginRequest(authData));
    }
}
