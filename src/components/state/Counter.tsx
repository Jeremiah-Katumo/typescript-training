// import { count } from "console";
import { useReducer } from "react";

const initialState = { count: 0 }

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + action.payload }
        case 'decrement':
            return { count: state.count - action.payload }
        default:
            return state
    }
}

