import * as actionTypes from "./actionTypes";
import initialState from "../initialState";

export default function reducer(state=initialState.stocks, action) {
    switch (action.type){
        case actionTypes.LO:
            return {...state, user: action.payload };
        case actionTypes.LOGOUT_SUCCESS:
            return {...state, user: {} };
        default:
            return state;
    }
}