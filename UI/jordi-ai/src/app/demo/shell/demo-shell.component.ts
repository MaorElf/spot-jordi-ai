import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {DemoProvider} from '../demo.provider';
import {demoAuthData} from '../auth-data.const';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AUTH_PROVIDER_TOKEN} from '../../client-cores-services-integration/auth-provider.token';
import {IAuthProvider} from '@spotinst/spot-client-core-services-types';
import {LogoutOptions} from '@spotinst/spot-client-core-services-types/app/services/auth/models/logout-options.model';

@Component({
    selector:        'spt-demo-shell',
    templateUrl:     'demo-shell.component.html',
    styleUrls:       ['demo-shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class DemoShellComponent {

    public readonly isLoggedIn$: Observable<boolean> = this.authProvider.isAuthenticated$();

    public readonly userName$: Observable<string> = this.authProvider.currentUser$.pipe(
        map(user => user?.displayName)
    );

    constructor(private demoProvider: DemoProvider, @Inject(AUTH_PROVIDER_TOKEN) private authProvider: IAuthProvider) {
    }

    login(): void {
        this.demoProvider.requestLogin(demoAuthData);
    }

    logout(): void {
        const logoutOptions: LogoutOptions = {
            reloadOnLogout:      false,
            redirectToLoginPage: false
        };

        this.authProvider.logout(logoutOptions);
    }
}

export {DemoShellComponent};
