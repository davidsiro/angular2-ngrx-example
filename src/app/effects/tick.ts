import {Injectable} from "@angular/core";
import {Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {BitfinexService} from "../service/bitfinex.service";
import {TickReceivedAction} from "../actions/tick";

@Injectable()
export class TickEffects {

    constructor(private bitfinexService: BitfinexService) {}

    @Effect()
    tickReceived: Observable<Action> = this.bitfinexService.ticker
        .map(tick => new TickReceivedAction(tick));

}
