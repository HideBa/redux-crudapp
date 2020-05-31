import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import events from "./events";

const reducer = combineReducers({ events, form });
export default reducer;
export type Store = ReturnType<typeof reducer>;
