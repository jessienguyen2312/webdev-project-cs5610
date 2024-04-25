import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
        },

        addFavorite: (state, action: PayloadAction<string>) => {
        
            if (state.user) {
                state.user.favoriteBook = state.user.favoriteBook;
                if (!state.user.favoriteBook.includes(action.payload)) {
                    state.user.favoriteBook.push(action.payload);
                }
            }
        },

        removeFavorite: (state, action: PayloadAction<string>) => {
            if (state.user && state.user.favoriteBook) {
                state.user.favoriteBook = state.user.favoriteBook.filter(bookKey => bookKey !== action.payload);
            }
        },


        followUser: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.following = state.user.following || [];
                if (!state.user.following.includes(action.payload)) {
                    state.user.following.push(action.payload);
                }
            }
        },

        unfollow: (state, action: PayloadAction<string>) => {
            if (state.user && state.user.following) {
                state.user.following = state.user.following.filter(username => username !== action.payload);
            }
        }

    }
});

export const { setUser, resetUser, addFavorite, removeFavorite, followUser, unfollow } = userSlice.actions;
export default userSlice.reducer;