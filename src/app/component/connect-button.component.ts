import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'connect-button',
    template: `
        <button class="btn btn-primary" [disabled]="disabled" (click)="onConnectClicked.emit(connected)">
            {{connected ? 'Disconnect': 'Connect'}}
        </button>
    `
})
export class ConnectButtonComponent {

    @Input() disabled: boolean;
    @Input() connected: boolean;
    @Output() onConnectClicked = new EventEmitter<boolean>();

}
