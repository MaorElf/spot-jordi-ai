import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {MainComponent} from './main/main.component';
import {AuthGuard, DEFAULT_ROUTE, SptRoute, CapabilityGuard} from '@spotinst/spot-client-shared';

const CAPABILITY_NAME = 'aws:console:spot-connect';

const routes: SptRoute[] = [
    {
        path:             'newAppPrefix',
        canActivate:      [AuthGuard],
        canActivateChild: [AuthGuard],
        data:             {
            isPublic:           true,
            infraCredsRequired: false,
            shouldShowHeader:   true,
            isAllAccountsMode:  false,
            shouldShowNavbar:   true
        },
        children:         [
            {
                path:      '',
                pathMatch: 'full',
                component: MainComponent,
                data:      {

                    isPublic:           true,
                    infraCredsRequired: false,
                    shouldShowHeader:   true,
                    isAllAccountsMode:  false,
                    shouldShowNavbar:   true
                }
            },
            {
                path:             'demo',
                canActivate:      [CapabilityGuard],
                canActivateChild: [CapabilityGuard],
                loadChildren:     () => import('./demo/demo.module').then(mod => mod.DemoModule),
                data:             {
                    isPublic:           true,
                    infraCredsRequired: false,
                    shouldShowHeader:   true,
                    isAllAccountsMode:  false,
                    shouldShowNavbar:   true,
                    capability:         CAPABILITY_NAME
                }
            },
            {
                path:       '**',
                redirectTo: DEFAULT_ROUTE,
                data:       {
                    isPublic:           false,
                    infraCredsRequired: false
                }
            }
        ]
    },
    {
        path:     '**',
        children: [],
        data:     {
            isPublic:           true,
            infraCredsRequired: false,
            shouldShowHeader:   false,
            isAllAccountsMode:  false,
            shouldShowNavbar:   true
        }
    }
];

@NgModule({
    imports:   [RouterModule.forRoot(routes)],
    exports:   [RouterModule],
    providers: [
        {
            provide:  APP_BASE_HREF,
            useValue: '/'
        }
    ]
})
class AppRoutingModule {
}

export {AppRoutingModule};
