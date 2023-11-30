import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./User.reducer";
import ProfCreatReducer from "./ProfCreat.reducer";
import JobjsReducer from "./Jobjs.reducer";
import LinksReducer from "./Links.reducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    profile: ProfCreatReducer,
    jobs: JobjsReducer,
    link: LinksReducer,
  },
});

export default store;
