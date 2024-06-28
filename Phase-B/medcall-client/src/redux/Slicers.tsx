import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    id: "",
    email: "",
    role: "",
    firstName: "",
    lastName: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    resetUser: (state) => {
      state.id = "";
      state.email = "";
      state.role = "";
      state.firstName = "";
      state.lastName = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;
