import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginSuccess} from '@spotinst/spot-client-shared';
import {Actions, createEffect, CreateEffectMetadata, ofType} from '@ngrx/effects';
import {DemoActionType, DemoLoginRequest} from './demo.actions';
import {map} from 'rxjs/operators';

@Injectable()
export class DemoEffects {
    public readonly login$: Observable<LoginSuccess> & CreateEffectMetadata;

    constructor(private actions$: Actions) {
        this.login$ = createEffect(
            () => this.actions$.pipe(
                ofType(DemoActionType.LOGIN_REQUEST),
                map((action: DemoLoginRequest) => new LoginSuccess(action.authData))
            )
        );
    }
}
