import { combineReducers } from "redux";
import chats from "./chats";
// import auth from "./auth";

const rootReducer = combineReducers({
  chats,
  // auth,
});

export default rootReducer;