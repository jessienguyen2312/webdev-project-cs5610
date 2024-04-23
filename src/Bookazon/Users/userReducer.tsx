import { createSlice } from "@reduxjs/toolkit";
import { User } from "../Users/client";

interface UserState {
    user: User | null;
  }
  
  const initialState: UserState = {
    user: null,
  };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;