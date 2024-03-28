import { Country } from "../Models/countryModels";
import { gptReducer } from "../components/gpt/state/gpt.reducer";
import { GPT_STATE_NAME } from "../components/gpt/state/gpt.selector";
import { gptState } from "../components/gpt/state/gpt.state";
import { countryFormReducer, countryReducer } from "../components/search-form/state/country.reducer";
import { COUNTRY_FORM_STATE_NAME, COUNTRY_STATE_NAME } from "../components/search-form/state/country.selector";
import { countryFormState, countryState } from "../components/search-form/state/country.state";
import { SharedReducer } from "../components/shared/state/shared.reducer";
import { SHARED_STATE_NAME } from "../components/shared/state/shared.selector";
import { SharedState } from "../components/shared/state/shared.state";

export interface AppState
{
    [GPT_STATE_NAME]:gptState
    [COUNTRY_STATE_NAME]:countryState
    [COUNTRY_FORM_STATE_NAME]:countryFormState
    [SHARED_STATE_NAME]:SharedState
}

export const appReducer = {

    [GPT_STATE_NAME]:gptReducer,
    [COUNTRY_STATE_NAME]:countryReducer,
    [COUNTRY_FORM_STATE_NAME]:countryFormReducer,
    [SHARED_STATE_NAME]:SharedReducer

}