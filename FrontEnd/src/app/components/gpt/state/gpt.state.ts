import { GPTResponse } from "../../../Models/gptModels";

export interface gptState
{
    gptResponse:GPTResponse|null
}

export const initialGptState:gptState=
{
    gptResponse:null
}