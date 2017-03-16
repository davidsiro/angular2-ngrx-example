import {Injectable} from "@angular/core";
import {Effect, Actions, toPayload} from "@ngrx/effects";
import {Observable, Subject} from "rxjs";
import {Action} from "@ngrx/store";
import * as connection from "../actions/connection";
import {BitfinexService} from "../service/bitfinex.service";

@Injectable()
export class ConnectionEffects {

    constructor(private actions: Actions, private bitfinexService: BitfinexService) {}

    @Effect()
    connect: Observable<Action> = this.actions
        .ofType(connection.ActionTypes.CONNECT_REQUEST)
        .switchMap(action => {
            return this.bitfinexService.connect(action.payload)
                .filter(connected => connected === true)
                .map(connected => new connection.ConnectSuccessAction());
        });

    @Effect()
    disconnect: Observable<Action> = this.actions
        .ofType(connection.ActionTypes.DISCONNECT_REQUEST)
        .switchMap(action => {
            return this.bitfinexService.disconnect()
                .filter(connected => connected === false)
                .map(connected => new connection.DisconnectSuccessAction());
        });

}
