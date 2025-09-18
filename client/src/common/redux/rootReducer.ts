import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authReducer from "@/auth/auth.slice";

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  authLogin: authReducer,
});

export { rootPersistConfig, rootReducer };
