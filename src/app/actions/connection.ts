import {type} from "../utils";
import {Action} from "@ngrx/store";

export const ActionTypes = {
    CONNECT_REQUEST: type('[Connect] Request'),
    CONNECT_SUCCESS: type('[Connect] Success'),
    DISCONNECT_REQUEST: type('[Disconnect] Request'),
    DISCONNECT_SUCCESS: type('[Disconnect] Success'),
};

export class ConnectRequestAction implements Action {
    type = ActionTypes.CONNECT_REQUEST;

    constructor(public payload: string) { }
}

export class ConnectSuccessAction implements Action {
    type = ActionTypes.CONNECT_SUCCESS;
    payload: any = null;
}

export class DisconnectRequestAction implements Action {
    type = ActionTypes.DISCONNECT_REQUEST;
    payload: any = null;
}

export class DisconnectSuccessAction implements Action {
    type = ActionTypes.DISCONNECT_SUCCESS;
    payload: any = null;
}

export type Actions =
    ConnectRequestAction|
    ConnectSuccessAction|
    DisconnectRequestAction|
    DisconnectSuccessAction;

