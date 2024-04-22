import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    OLAuthor: {
        author_key: "",
        author_name: "",
        author_dob: "",
        author_bio: "",
        author_works: []
    }

};

const OLAuthorProfileSlice = createSlice({
    name: 'OLAuthor',
    initialState,
    reducers: {
        setAuthorKey: (state, action) => {
            state.OLAuthor = action.payload;
        },
        setAuthorProfile: (state, action) => {
            state.OLAuthor= {...state.OLAuthor, ...action.payload };
        },
        setAuthorWorks: (state, action) => {
            state.OLAuthor = {...state.OLAuthor, ...action.payload };
        }
    },

});

export const {setAuthorKey, setAuthorProfile, setAuthorWorks} = OLAuthorProfileSlice.actions;
export default OLAuthorProfileSlice.reducer;