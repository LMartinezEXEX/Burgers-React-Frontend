import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadState, saveState } from './helpers/localStorage';

const persistedState = loadState();

const middleware = [thunk];

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
    saveState({
      cart: store.getState().cart,
      design: store.getState().design,
      message: store.getState().message
    });
  })

export default store;