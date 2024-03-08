import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector:        'spt-demo-secret',
    templateUrl:     'demo-secret.component.html',
    styleUrls:       ['demo-secret.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

class DemoSecretComponent {
}

export {DemoSecretComponent};
