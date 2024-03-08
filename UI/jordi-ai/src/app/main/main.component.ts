import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector:        'spt-app-main', // TODO: replace "app" with app name, e.g. "spt-settings-main"
    templateUrl:     './main.component.html',
    styleUrls:       ['main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class MainComponent {
}

export {MainComponent};
