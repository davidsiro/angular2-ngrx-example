import {Component, Input} from "@angular/core";
import {Trend} from "../models/trend";

@Component({
    selector: 'trend',
    templateUrl: './trend.component.html'
})
export class TrendComponent {

    @Input() trend: Trend;

    public get classes() {
        return {
            'alert': true,
            'alert-success': Trend.UP === this.trend,
            'alert-danger': Trend.DOWN === this.trend,

        }
    }

    public get trendAsStr() {
        if (this.trend === null) {
            return '---';
        }
        return this.trend === Trend.UP ? 'UP' : 'DOWN';
    }

}
