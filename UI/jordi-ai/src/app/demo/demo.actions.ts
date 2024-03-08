import {Action} from '@ngrx/store';
import {AuthData} from '@spotinst/spot-client-shared';

export enum DemoActionType {
    LOGIN_REQUEST = '[Demo] Login Request'
}

export class DemoLoginRequest implements Action {
    public readonly type = DemoActionType.LOGIN_REQUEST;

    constructor(public readonly authData: AuthData) { }
}
