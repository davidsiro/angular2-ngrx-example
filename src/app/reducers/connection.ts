import * as connection from "../actions/connection";

export interface State {
    connected: boolean;
    connecting: boolean;
    pair: string;
}
export const initialState: State = {
    connected: false,
    connecting: false,
    pair: null
};

export function reducer(state = initialState, action: connection.Actions): State {
    switch (action.type) {
        case connection.ActionTypes.CONNECT_REQUEST:
            return {
                connected: false,
                connecting: true,
                pair: action.payload
            };
        case connection.ActionTypes.CONNECT_SUCCESS:
            return Object.assign({}, state, {
                connected: true,
                connecting: false
            });
        case connection.ActionTypes.DISCONNECT_REQUEST:
            return Object.assign({}, state, {
                connecting: true
            });
        case connection.ActionTypes.DISCONNECT_SUCCESS:
            return {
                connected: false,
                connecting: false,
                pair: null
            };
        default:
            return state;
    }
}
