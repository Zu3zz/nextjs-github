/**
 * @author 3zz.
 * @data 2020/10/19
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import types from './types';

const initialState = {
  count: 0,
};

const userInitialState = {};


function counterReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD:
      return {count: state.count + (action.num || 1)};
    default:
      return state;
  }
}

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
}

const allReducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {counter: initialState, user: userInitialState,},
      state,
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  );
  
  return store;
}
