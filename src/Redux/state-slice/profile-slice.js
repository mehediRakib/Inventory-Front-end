import {createSlice} from "@reduxjs/toolkit";

const initialState={
    value:[]
}
export const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        SetProfile:(state,action)=>{
            state.value=action.payload;
        }
    }

})

export const {SetProfile}=profileSlice.actions;
export default profileSlice.reducer;