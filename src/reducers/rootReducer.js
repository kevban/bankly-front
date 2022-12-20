import { combineReducers } from "@reduxjs/toolkit";
import plaidReducer from "./plaidReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({plaid: plaidReducer, auth: authReducer})

export default rootReducer