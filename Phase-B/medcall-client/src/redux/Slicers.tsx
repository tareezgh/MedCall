import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    id: "",
    email: "",
    role: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isGoogleSignIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.isGoogleSignIn = action.payload.isGoogleSignIn;
    },
    setUpdatedUser: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
    },
    resetUser: (state) => {
      state.id = "";
      state.email = "";
      state.role = "";
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.isGoogleSignIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUpdatedUser, resetUser } = userSlice.actions;
