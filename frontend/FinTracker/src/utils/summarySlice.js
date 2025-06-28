import { createSlice } from "@reduxjs/toolkit";
import { createElement } from "react";


const summarySlice = createSlice({
    name:'summary',
    initialState:{},
    reducers:{
        addSummary:(state,action)=>{
            return action.payload
        },
        removeSummary:(state)=>{
            return {}
        },

    }
})

export const {addSummary,removeSummary} = summarySlice.actions
export default summarySlice.reducer