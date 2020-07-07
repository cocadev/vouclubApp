import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';

import API from './libs/api'

import reducers from './reducers';

import { middleware } from './libs/redux';

const loggerMiddleware = createLogger({ predecate: (getState, action) => __DEV__});

export default function getStore() {
    const store = createStore(
        reducers,
        applyMiddleware(thunk.withExtraArgument(API),loggerMiddleware,middleware)
        // applyMiddleware(thunk.withExtraArgument(API))
    );

    return store;
}