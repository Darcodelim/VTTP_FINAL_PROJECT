import { Component, OnDestroy } from '@angular/core';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { geterror, isLoginRegistered } from './components/Authentication/state/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { LoginState } from './components/Authentication/state/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  title = 'FrontEnd';

  errorMessage$!:Observable<string|null>;
  loginStatusOb$!:Observable<LoginState>;

  errorMessageSub!:Subscription
  loginStatusSub!:Subscription

  loginStatus!:boolean;


  constructor(private store:Store<AppState>)
  {
      this.errorMessage$ = this.store.select(geterror)
      this.loginStatusOb$ = this.store.select(isLoginRegistered)

      this.loginStatusOb$.subscribe((status)=>{
        this.loginStatus = status.loginStatus;
      })

  }
  ngOnDestroy(): void {
    this.errorMessageSub.unsubscribe()
    this.loginStatusSub.unsubscribe()

  }




}
