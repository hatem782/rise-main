import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";

import { UserReducer } from "../user/user.reducer";
import { CompanyReducer } from "../company/company.reducer";
import { TalentReducer } from "../talents/talent.reducer";
import { SousAdminsReducer } from "../sousadmins/sousadmins.reducer";
import { feedbacksReducer } from "../feedbacks/feedbacks.reducer";
import { ConvReducer } from "../conversation/conversation.reducer";
import { JobReducer } from "../jobs/jobs.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  UserReducer,
  CompanyReducer,
  TalentReducer,
  SousAdminsReducer,
  feedbacksReducer,
  ConvReducer,
  JobReducer,
});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
