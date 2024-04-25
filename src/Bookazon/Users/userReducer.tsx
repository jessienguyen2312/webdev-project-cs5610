import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
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
                
                // Check if the book is already in the favorites
                if (!state.user.favoriteBook.includes(action.payload)) {
                    // Create a new array with all old favorite books plus the new one
                    state.user.favoriteBook = [...state.user.favoriteBook, action.payload];
                    console.log("REDUCER STATE", current(state.user.favoriteBook))
                }
            }
        },
        // addFavorite: (state, action: PayloadAction<string>) => {
        //     if (state.user) {
        //         // Ensure `state.user.favoriteBook` exists and is an array.
        //         if (!state.user.favoriteBook) {
        //             state.user.favoriteBook = [];
        //         }
        
        //         // Check if the favorite book already exists in the list
        //         if (!state.user.favoriteBook.includes(action.payload)) {
        //             // Directly push to the array since immer handles immutability
        //             state.user.favoriteBook.push(action.payload);
        //         }
        //     }
        // },

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