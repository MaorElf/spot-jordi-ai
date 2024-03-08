import {TranslateLoader} from '@ngx-translate/core';
import {from, Observable} from 'rxjs';

export class LazyTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<unknown> {
        return from(
            import(
                /* webpackChunkName: "i18n" */
                /* webpackPreload: true */
                `../../assets/i18n/${lang}.json`)
        );
    }
}
