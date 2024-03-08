import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector:        'spt-demo-header',
    templateUrl:     'demo-header.component.html',
    styleUrls:       ['demo-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

class DemoHeaderComponent {
    @Input() public isLoggedIn = false;

    @Input() public userName = '';

    @Output() logIn = new EventEmitter<boolean>();

    @Output() logOut = new EventEmitter<boolean>();

    public requestLogIn(): void {
        this.logIn.emit(true);
    }

    public requestLogOut(): void {
        this.logOut.emit(true);
    }
}

export {DemoHeaderComponent};
