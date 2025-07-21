import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./connectionSlice";
import feedReducer from "./feedSlice";
import requestSlice from "./requestSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestSlice,
  },
});
export default appStore;
