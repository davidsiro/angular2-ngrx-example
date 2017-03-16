import * as trades from "../actions/tick";
import {Tick} from "../models/tick";
import {ActionTypes} from "../actions/tick";
import * as connection from "../actions/connection";

export interface State {
    ticks: Tick[];
}

export const initialState: State = {
    ticks: []
};

export function reducer(state = initialState, action: trades.Actions): State {
    switch (action.type) {
        case ActionTypes.TICK_RECEIVED:
            let noOfTicks = state.ticks.length;
            if (noOfTicks < 10) {
                return {
                    ticks: [action.payload, ...state.ticks]
                };
            } else {
                return {
                    ticks: [action.payload, ...state.ticks.slice(0, noOfTicks - 1)]
                };
            }
        case connection.ActionTypes.DISCONNECT_SUCCESS:
            return {
                ticks: []
            };
        default:
            return state;
    }
}
