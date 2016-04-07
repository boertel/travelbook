import React from 'react'
import { connect } from 'react-redux'

import store from './store'


function getTypes(key) {
    const statusKey = key.toUpperCase();
    return {
        success: statusKey + '_SUCCESS',
        fail: statusKey + '_FAIL',
        pending: statusKey + '_PENDING'
    };
}

function getStoreKey(key) {
    return key + 'State';
}

function reducer(key, success) {
    const types = getTypes(key);
    let defaultState = {}
    defaultState[key] = {
        isPending: true, isFulfilled: false, data: undefined
    };

    return {
        key: getStoreKey(key),
        reducer: function(state=defaultState, action) {
            switch(action.type) {
                case types.success:
                    var newState = {};
                    if (success) {
                        newState[key] = success(state, action, key)
                    } else {
                        newState[key] = action[key];
                    }
                    return Object.assign({}, state, newState)
            }
            return state;
        }
    }
}

function asynchronous(options) {
    var fetchOptions = {};

    // always handle url option as a function
    if (typeof options.url === 'string') {
        fetchOptions.url = function() {
            return options.url;
        }
    } else {
        fetchOptions.url = options.url;
    }

    const key = options.key;
    const types = getTypes(key);


    function dispatch(data) {
        var toDispatch = {
            type: types.success
        }
        toDispatch[options.key] = {
            isFulfilled: true,
            isPending: false,
            data: data
        };
        store.dispatch(toDispatch);
    }

    function myFetch(url, props) {
        let promise = fetch(url).then(response => {
            return response.json();
        })

        if (options.transform) {
            promise = promise.then(function (data) {
                return options.transform(data, props);
            });
        }

        return promise.then(dispatch);
    }

    return function (Component) {
        class AsyncReduxContainer extends React.Component {
            fetch(url) {
                myFetch(url, this.props)
            }

            componentDidMount() {
                const url = fetchOptions.url(this.props);
                this.fetch(url);
            }

            componentWillReceiveProps(nextProps) {
                const previousUrl = fetchOptions.url(this.props);
                const url = fetchOptions.url(nextProps);
                if (previousUrl !== url) {
                    this.fetch(url);
                }
            }

            render() {
                return <Component {...this.props} />
            }
        }

        const mapStateToProps = function(store) {
            const storeKey = getStoreKey(key);
            if (store[storeKey] === undefined) {
                console.warn(key + ' is missing its reducer');
                return {};
            }
            const fromStore = store[storeKey][key],
                data = {};
            data[key] = fromStore;
            return data;
        }

        return connect(mapStateToProps)(AsyncReduxContainer);
    }
}

export { reducer, asynchronous }
