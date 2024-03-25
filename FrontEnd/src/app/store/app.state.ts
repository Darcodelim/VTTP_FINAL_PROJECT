import { gptReducer } from "../components/gpt/state/gpt.reducer";
import { GPT_STATE_NAME } from "../components/gpt/state/gpt.selector";
import { gptState } from "../components/gpt/state/gpt.state";

export interface AppState
{
    [GPT_STATE_NAME]:gptState
}

export const appReducer = {

    [GPT_STATE_NAME]:gptReducer

}