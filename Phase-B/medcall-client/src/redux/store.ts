import { configureStore } from "@reduxjs/toolkit";

import { locationSlice, userSlice } from "./Slicers";

export default configureStore({
  reducer: {
    currentUser: userSlice.reducer,
    location: locationSlice.reducer,
  },
});
