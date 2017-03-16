import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../reducers/index";
import {Observable} from "rxjs";
import {Tick} from "../models/tick";

@Component({
    selector: 'ticker',
    templateUrl: './ticker.component.html'
})
export class TickerComponent {

    ticks: Observable<Tick[]>;

    constructor(private store: Store<State>) {
        this.ticks = store.select(s => s.tick.ticks);
    }

}
