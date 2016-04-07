import { createStore, combineReducers } from 'redux'

import { reducer } from './asynchronous'


const keys = {
    'trips': {},
    'trip': {},
    'day': {}
}

// async reducers
let reducers = {};
for (var key in keys) {
    var options = keys[key];
    const r = reducer(key, options.success);
    reducers[r.key] = r.reducer;
}

// custom reducers

function markerReducer(state={markers: []}, action) {
    switch (action.type) {
        case 'MARKER_ADD':
            return Object.assign({}, state, { markers: [...state.markers, action.marker] });
        case 'MARKER_REMOVE':
            const index = state.markers.indexOf(action.marker);
            const newMarkers = [
                ...state.markers.slice(0, index),
                ...state.markers.slice(0, index + 1)
            ]
            return Object.assign({}, state, { markers: newMarkers });
    }
    return state;
}

reducers.markersState = markerReducer;

export default createStore(combineReducers(reducers));
