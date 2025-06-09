import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./slice/event";

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;