import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../reducers/index";
import {ConnectRequestAction} from "../actions/connection";
import {Observable} from "rxjs";
import {DisconnectRequestAction} from "../actions/connection";

@Component({
    selector: 'connection',
    templateUrl: './connection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionComponent {

    pairs: string[] = ['BTCUSD', 'LTCUSD', 'ETHUSD'];

    selectedPair: string = this.pairs[0];

    isConnecting: Observable<boolean>;
    isConnected: Observable<boolean>;

    constructor(private store: Store<State>) {
        this.isConnecting = store.select(s => s.connection.connecting);
        this.isConnected = store.select(s => s.connection.connected);
    }

    public connectOrDisconnect(connected: any) {
        this.store.dispatch(connected ? new DisconnectRequestAction() : new ConnectRequestAction(this.selectedPair));
    }

}
