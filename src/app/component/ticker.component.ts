import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../reducers/index";
import {Observable} from "rxjs";
import {Tick} from "../models/tick";
import {Trend} from "../models/trend";

@Component({
    selector: 'ticker',
    templateUrl: './ticker.component.html'
})
export class TickerComponent {

    ticks: Observable<Tick[]>;
    trend: Observable<Trend>;

    constructor(private store: Store<State>) {
        this.ticks = store.select(s => s.tick.ticks);
        this.trend = store.select(s => s.tick.trend);
    }

}
