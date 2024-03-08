import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';
import {
    HEADER_COMMUNICATION_PROVIDER_TOKEN
} from './client-cores-services-integration/header-communication-provider.token';
import {IHeaderCommunicationProvider} from '@spotinst/spot-client-core-services-types';
import {map} from 'rxjs/operators';
import {VersionService} from '@spotinst/spot-client-shared';

@Component({
    selector:        'spt-jordi-root',
    templateUrl:     './app.component.html',
    styleUrls:       ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation:   ViewEncapsulation.None
})
class AppComponent implements OnInit, OnDestroy {
    public headerHeight$: Observable<number>;

    public heightCss$: Observable<string>;

    public polledVersion$: Subscription;

    public shouldShowJordi: boolean;

    constructor(private translate: TranslateService,
                @Inject(HEADER_COMMUNICATION_PROVIDER_TOKEN)
                private headerCommunicationProvider: IHeaderCommunicationProvider,
                private versionService: VersionService) {
        this.translate.setDefaultLang('en');
        this.headerHeight$ = this.headerCommunicationProvider.headerHeightBS;
        this.heightCss$    = this.headerHeight$.pipe(
            map(headerHeight => `calc(100vh - ${headerHeight}px`)
        );
    }

    ngOnInit(): void {
        this.polledVersion$ = this.versionService.polledVersion$.subscribe();
    }

    ngOnDestroy(): void {
        this.polledVersion$.unsubscribe();
    }

    closeJordiPanel() {
        this.shouldShowJordi = false;
    }

    showJordi() {
        this.shouldShowJordi = true;
    }
}

export {AppComponent};
