import { combineReducers } from "@reduxjs/toolkit";
import plaidReducer from "./plaidReducer";

const rootReducer = combineReducers({plaid: plaidReducer})

export default rootReducer