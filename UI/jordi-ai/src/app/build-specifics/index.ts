import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export const STORE_DEV_TOOLS_MODULE = [StoreDevtoolsModule.instrument({
    maxAge: 25,
    name: 'Jordi DevTools',
})];
