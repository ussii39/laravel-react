import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import persistState from "redux-localstorage";
import { UsersReducer } from "../redux/reducers";

export default function createStore(history) {
    return compose(persistState())(reduxCreateStore)(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
        }),
        applyMiddleware(routerMiddleware(history), thunk)
    );
}
