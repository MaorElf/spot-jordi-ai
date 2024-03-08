import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {DemoShellComponent} from './shell/demo-shell.component';
import {DemoRoutingModule} from './demo-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {DemoEffects} from './demo.effects';
import {DemoProvider} from './demo.provider';
import {DemoMainComponent} from './main/main.component';
import {DemoHeaderComponent} from './header/demo-header.component';
import {DemoSecretComponent} from './secret/demo-secret.component';
import {CrossMfeRoutingTestsComponent} from './cross-mfe-routing-tests/cross-mfe-routing-tests.component';
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe} from "@angular/common";

@NgModule({
    imports: [
        DemoRoutingModule,
        EffectsModule.forFeature([DemoEffects]),
        TranslateModule,
        MatButtonModule,
        AsyncPipe
    ],
    exports:      [],
    declarations: [
        DemoShellComponent,
        DemoHeaderComponent,
        DemoMainComponent,
        DemoSecretComponent,
        CrossMfeRoutingTestsComponent
    ],
    providers: [
        DemoProvider
    ]
})
class DemoModule {
}

export {DemoModule};
