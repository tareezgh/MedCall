import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./Slicers";

export default configureStore({
  reducer: {
    currentUser: userSlice.reducer,
  },
});
