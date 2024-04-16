import { createFeatureSelector, createSelector } from "@ngrx/store"
import { gptState, responseErrorState } from "./gpt.state"

export const GPT_STATE_NAME = "Gpt"
export const GPT_RESPONSE_ERROR_STATE_NAME = "Error state from GPT response"

//creating feature name
const selectGptState = createFeatureSelector<gptState>(GPT_STATE_NAME);
const selectGptResponseErrorState = createFeatureSelector<responseErrorState>(GPT_RESPONSE_ERROR_STATE_NAME)

export const getGptResponse = createSelector(selectGptState,state=>{
    return state.gptResponse
})

export const getGptReponseError = createSelector(selectGptResponseErrorState,state=>{

    return state.error
})