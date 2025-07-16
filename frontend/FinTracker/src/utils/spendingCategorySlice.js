import { createSlice } from "@reduxjs/toolkit"


const spendingCategorySlice = createSlice({
    name:"spendingCategory",
    initialState:null,
    reducers:{
        addSpendingCategory:(state,action)=>{
            return action.payload
        },
        removeSpendingCategory:(state)=>{
            return null
        }
    }
})

export const {addSpendingCategory,removeSpendingCategory} = spendingCategorySlice.actions
export default spendingCategorySlice.reducer