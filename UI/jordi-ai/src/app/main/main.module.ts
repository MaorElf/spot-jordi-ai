import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [MainComponent],
    imports: [
        RouterModule,
        MatButtonModule
    ]
})
class MainModule { }

export {MainModule};
