import { configureStore } from "@reduxjs/toolkit";

import { locationSlice, requestSlice, userSlice } from "./Slicers";

export default configureStore({
  reducer: {
    currentUser: userSlice.reducer,
    location: locationSlice.reducer,
    requests: requestSlice.reducer,
  },
});
