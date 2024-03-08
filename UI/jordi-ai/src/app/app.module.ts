import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    ASSET_URL_MAPPER,
    ExceptionManagerService,
    InterceptorsModule,
    MainModule as ScsMainModule,
    NoopAriaDescriberService,
    RouteBasedCommunicationModule,
    SptOverlayModule
} from '@spotinst/spot-client-shared';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MainModule} from './main/main.module';
import {STORE_DEV_TOOLS_MODULE} from './build-specifics';
import {assetUrl} from '../single-spa/asset-url';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ClientCoreServicesIntegrationModule} from './client-cores-services-integration/client-core-services-integration.module';
import {AriaDescriber} from '@angular/cdk/a11y';
import {LazyTranslateLoader} from './utils/utils';
import {JordiPanelComponent} from "./components/jordi-panel/jordi-panel.component";


@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        JordiPanelComponent,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot({}),
        STORE_DEV_TOOLS_MODULE, // this will automatically & intentionally be empty for prod builds, by using "fileReplacements" in angular.json
        EffectsModule.forRoot([]),
        InterceptorsModule.forRoot(),
        ScsMainModule,
        MainModule,
        ClientCoreServicesIntegrationModule,
        SptOverlayModule,
        RouteBasedCommunicationModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useClass: LazyTranslateLoader
            },
            isolate: true
        }),
        JordiPanelComponent
    ],
    providers: [
        {
            provide:  ErrorHandler,
            useClass: ExceptionManagerService
        },
        {
            provide:  ASSET_URL_MAPPER,
            useValue: assetUrl
        },
        {
            provide:  APP_BASE_HREF,
            useValue: '/'
        },
        {
            provide:  AriaDescriber,
            useClass: NoopAriaDescriberService
        }
    ],
    bootstrap: [AppComponent]
})
class AppModule { }

export {AppModule};
