import { createFeatureSelector, createSelector } from "@ngrx/store";
import { dialogTitleState } from "./dialog.state";

export const DIALOG_TITLE_STATE_NAME = "DIALOG TITLE"

//creating feature name
const selectDialogTitleState = createFeatureSelector<dialogTitleState>(DIALOG_TITLE_STATE_NAME);

export const getTitle = createSelector(selectDialogTitleState,state=>{
    return state.title
})