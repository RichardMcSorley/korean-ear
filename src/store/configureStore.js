import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import trainReducer from '../reducers/train';
import selectionReducer from '../reducers/selection'
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      train: trainReducer,
      selection: selectionReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
