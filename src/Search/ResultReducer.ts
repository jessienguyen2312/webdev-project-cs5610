import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    result: []
};

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload;
        },
        resetResult: (state) => {
            state.result = initialState.result;
        }
    }
});

export const {setResult, resetResult} = resultSlice.actions;
export default resultSlice.reducer;