import { createFeatureSelector, createSelector } from "@ngrx/store"
import { gptState } from "./gpt.state"

export const GPT_STATE_NAME = "Gpt"

//creating feature name
const selectGptState = createFeatureSelector<gptState>(GPT_STATE_NAME);

export const getGptResponse = createSelector(selectGptState,state=>{
    return state.gptResponse
})