import {NgModule} from '@angular/core';

import {DemoShellComponent} from './shell/demo-shell.component';
import {RouterModule} from '@angular/router';
import {DemoMainComponent} from './main/main.component';
import {DemoSecretComponent} from './secret/demo-secret.component';
import {SptRoute} from '@spotinst/spot-client-shared';
import {CrossMfeRoutingTestsComponent} from './cross-mfe-routing-tests/cross-mfe-routing-tests.component';

const routes: SptRoute[] = [
    {
        path:      '',
        component: DemoShellComponent,
        data:      {
            isPublic:           true,
            infraCredsRequired: false,
            shouldShowHeader:   true,
            isAllAccountsMode:  false,
            shouldShowNavbar:   true
        },
        children:  [
            {
                path:      '',
                component: DemoMainComponent,
                data:      {
                    isPublic:           true,
                    infraCredsRequired: false,
                    shouldShowHeader:   true,
                    isAllAccountsMode:  false,
                    shouldShowNavbar:   true
                }
            },
            {
                path:      'secret',
                component: DemoSecretComponent,
                data:      {
                    isPublic:           false,
                    infraCredsRequired: false,
                    shouldShowHeader:   true,
                    isAllAccountsMode:  false,
                    shouldShowNavbar:   true
                }
            },
            {
                path:      'cross-mfe-routing-tests',
                component: CrossMfeRoutingTestsComponent,
                data:      {
                    isPublic:           false,
                    infraCredsRequired: false,
                    shouldShowHeader:   true,
                    isAllAccountsMode:  false,
                    shouldShowNavbar:   true
                }
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
class DemoRoutingModule {
}

export {DemoRoutingModule};
