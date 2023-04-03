import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  avatar: string;
  userName: string;
  email: string;
  authority: string[];
}

export const initialState: UserState = {
  avatar: "",
  userName: "",
  email: "",
  authority: [],
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload,
    userLoggedOut: () => initialState,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
