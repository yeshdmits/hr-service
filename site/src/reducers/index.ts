import { combineReducers } from "@reduxjs/toolkit";
import cvReducer from "./cvReducer";
import jobReducer from "./jobReducer";
import matchingReducer from "./matchingReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  cvs: cvReducer,
  jobs: jobReducer,
  matching: matchingReducer,
  app: appReducer,
});

export default rootReducer;
