import React from 'react';

function reducer(state = { user: null }, action){
    switch (action.type) {
        case "set_submitted":
            return Object.assign({}, state, {
                submitted: true
            });
        case "store_token":
            return Object.assign({}, state, {
                token: action.payload
            });
        case "clear_token":
            return Object.assign({}, state, {
                token: null
            });
        case "store_user":
            return Object.assign({}, state, {
                user: action.payload
            });
        case "clear_user":
            return Object.assign({}, state, {
                user: null
            });
        default:
            return null;
    }
}

export default reducer;