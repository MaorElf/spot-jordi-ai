import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BlException} from '@spotinst/spot-client-shared';
import {AUTH_PROVIDER_TOKEN} from '../../client-cores-services-integration/auth-provider.token';
import {IAuthProvider} from '@spotinst/spot-client-core-services-types';

@Component({
    selector:        'spt-demo-main',
    templateUrl:     'main.component.html',
    styleUrls:       ['main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

class DemoMainComponent implements OnInit {

    public readonly isLoggedIn$: Observable<boolean> = this.authProvider.isAuthenticated$();

    public title: string;

    public readonly secretFeatureButtonLabel$: Observable<string> = this.isLoggedIn$.pipe(
        map(isAuthenticated => isAuthenticated? 'Go to Secret Feature' : 'Forbidden! you must log-in first')
    );

    constructor(@Inject(AUTH_PROVIDER_TOKEN) private authProvider: IAuthProvider,
                private translate: TranslateService) {
    }

    oops(): void {
        throw new BlException('oops', true);
    }

    ngOnInit(): void {
        this.title = this.translate.instant('demo.title');
    }
}

export {DemoMainComponent};
