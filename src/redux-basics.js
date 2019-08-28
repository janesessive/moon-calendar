const redux = require('redux');
const createStore = redux.createStore;

const rootReducer = (state, action) => {
    return state;
};

const store = createStore(rootReducer);

// store.dispatch