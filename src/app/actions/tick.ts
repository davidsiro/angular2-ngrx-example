import {type} from "../utils";
import {Action} from "@ngrx/store";
import {Tick} from "../models/tick";

export const ActionTypes = {
    TICK_RECEIVED: type('[Tick] Received'),
};

export class TickReceivedAction implements Action {
    type = ActionTypes.TICK_RECEIVED;

    constructor(public payload: Tick) { }
}

export type Actions = TickReceivedAction;

