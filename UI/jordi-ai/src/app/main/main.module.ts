import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [MainComponent],
    imports:      [
        RouterModule
    ]
})
class MainModule { }

export {MainModule};
