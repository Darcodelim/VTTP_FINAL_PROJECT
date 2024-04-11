import { Country } from "../Models/countryModels";
import { authorizationStatus } from "../Models/googleCalendarModels";
import { errorReducer, loginReducer } from "../components/Authentication/state/auth.reducer";
import { ERROR_STATE_NAME, LOGIN_STATE_NAME } from "../components/Authentication/state/auth.selector";
import { LoginState, loginErrorState } from "../components/Authentication/state/auth.state";
import { dialogReducer } from "../components/dialog-title-form/state/dialog.reducer";
import { DIALOG_TITLE_STATE_NAME } from "../components/dialog-title-form/state/dialog.selector";
import { dialogTitleState } from "../components/dialog-title-form/state/dialog.state";
import { AuthorizationReducer, googleSigningInReducer } from "../components/google-calendar/state/googleCalendar.reducer";
import { Authorization_STATE_NAME,GOOGLE_SIGNING_IN_STATE_NAME } from "../components/google-calendar/state/googleCalendar.selector";
import { googleSigningInState} from "../components/google-calendar/state/googleCalender.state";
import { gptReducer } from "../components/gpt/state/gpt.reducer";
import { GPT_STATE_NAME } from "../components/gpt/state/gpt.selector";
import { gptState } from "../components/gpt/state/gpt.state";
import { itineraryListReducer } from "../components/itineries-list/state/itineriesList.reducer";
import { ITINERIES_LIST_STATE_NAME } from "../components/itineries-list/state/itineriesList.selector";
import { itineriesListState } from "../components/itineries-list/state/itineriesList.state";
import { countryFormReducer, countryReducer } from "../components/search-form/state/country.reducer";
import { COUNTRY_FORM_STATE_NAME, COUNTRY_STATE_NAME } from "../components/search-form/state/country.selector";
import { countryFormState, countryState } from "../components/search-form/state/country.state";
import { SharedReducer } from "../components/shared/state/shared.reducer";
import { SHARED_STATE_NAME } from "../components/shared/state/shared.selector";
import { SharedState } from "../components/shared/state/shared.state";
import { mongoItineraryReducer } from "../components/view-itinerary/state/viewItinerary.reducer";
import { VIEW_ITINERARY_STATE_NAME } from "../components/view-itinerary/state/viewItinerary.selector";
import { viewItineraryState } from "../components/view-itinerary/state/viewItinerary.state";

export interface AppState
{
    [GPT_STATE_NAME]:gptState
    [COUNTRY_STATE_NAME]:countryState
    [COUNTRY_FORM_STATE_NAME]:countryFormState
    [SHARED_STATE_NAME]:SharedState
    [LOGIN_STATE_NAME]:LoginState
    [ERROR_STATE_NAME]:loginErrorState
    [DIALOG_TITLE_STATE_NAME]:dialogTitleState
    [ITINERIES_LIST_STATE_NAME]:itineriesListState
    [VIEW_ITINERARY_STATE_NAME]:viewItineraryState
    [Authorization_STATE_NAME]:authorizationStatus
    [GOOGLE_SIGNING_IN_STATE_NAME]:googleSigningInState
}

export const appReducer = {

    [GPT_STATE_NAME]:gptReducer,
    [COUNTRY_STATE_NAME]:countryReducer,
    [COUNTRY_FORM_STATE_NAME]:countryFormReducer,
    [SHARED_STATE_NAME]:SharedReducer,
    [LOGIN_STATE_NAME]:loginReducer,
    [ERROR_STATE_NAME]:errorReducer,
    [DIALOG_TITLE_STATE_NAME]:dialogReducer,
    [ITINERIES_LIST_STATE_NAME]:itineraryListReducer,
    [VIEW_ITINERARY_STATE_NAME]:mongoItineraryReducer,
    [Authorization_STATE_NAME]:AuthorizationReducer,
    [GOOGLE_SIGNING_IN_STATE_NAME]:googleSigningInReducer
}