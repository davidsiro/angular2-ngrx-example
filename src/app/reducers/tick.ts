import * as trades from "../actions/tick";
import {Tick} from "../models/tick";
import {ActionTypes} from "../actions/tick";
import * as connection from "../actions/connection";
import {Trend} from "../models/trend";

export interface State {
    ticks: Tick[];
    trend: Trend;
}

export const initialState: State = {
    ticks: [],
    trend: null
};

export function reducer(state = initialState, action: trades.Actions): State {
    switch (action.type) {
        case ActionTypes.TICK_RECEIVED:
            const noOfTicks = state.ticks.length;
            const endIndex = noOfTicks < 10 ? noOfTicks : noOfTicks - 1;
            const latestTick = action.payload;
            return {
                ticks: [latestTick, ...state.ticks.slice(0, endIndex)],
                trend: computeTrend(latestTick, state.ticks[0], state.trend)
            }
        case connection.ActionTypes.DISCONNECT_SUCCESS:
            return {
                ticks: [],
                trend: null
            };
        default:
            return state;
    }
}

function computeTrend(current: Tick, previous: Tick, previousTrend: Trend): Trend {
    if (!(current && previous)) {
        return null;
    }
    if (current.lastPrice > previous.lastPrice) {
        return Trend.UP;
    } else if (current.lastPrice < previous.lastPrice) {
        return Trend.DOWN;
    }
    return previousTrend;
}

