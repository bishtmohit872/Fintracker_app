import { createSlice } from "@reduxjs/toolkit";

const recentTransactionSlice = createSlice({
    name:"recentTransaction",
    initialState:null,
    reducers:{
        addRecentTransaction:(state,action)=>{
            return action.payload
        },
        removeRecentTransaction:(state)=>{
            return null
        }
    }
})

export const {addRecentTransaction,removeRecentTransaction} = recentTransactionSlice.actions
export default recentTransactionSlice.reducer