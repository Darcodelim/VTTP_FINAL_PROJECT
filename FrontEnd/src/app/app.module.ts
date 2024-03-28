import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GPTComponent } from './components/gpt/gpt.component';
import { HttpClientModule } from '@angular/common/http';
import { ItineraryService } from './Services/itinerary.service';
import { StoreModule } from '@ngrx/store';
import { gptReducer } from './components/gpt/state/gpt.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GptEffects } from './components/gpt/state/gpt.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/app.state';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModuleModule } from './material-module/material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { countryEffects } from './components/search-form/state/country.effects';
import { CountryService } from './Services/country.service';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner-gptResponse/loading-spinner.component';
import { LoginComponent } from './components/Authentication/login/login.component';
import { SignUpComponent } from './components/Authentication/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    GPTComponent,
    SearchFormComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    SignUpComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,StoreModule.forRoot(appReducer),EffectsModule.forRoot([GptEffects,countryEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),MaterialModuleModule,ReactiveFormsModule
  ],
  providers: [ItineraryService, provideAnimationsAsync(),CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
