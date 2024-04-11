import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { LogOut } from '../state/shared.action';
import { Observable, Subscription } from 'rxjs';
import { authorizationStatus } from '../../../Models/googleCalendarModels';
import { getAuthorizationState } from '../../google-calendar/state/googleCalendar.selector';
import { googleCalendarService } from '../../../Services/googleCalendar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy{


  googleVerify$!:Observable<boolean>
  
  googleVerifySub!:Subscription;
  googleServerStatusSub!:Subscription|undefined;

  verify!:boolean;

  constructor(private router:Router,private store:Store<AppState>,private googleCalSvc:googleCalendarService)
  {
    this.googleVerify$  = this.store.select(getAuthorizationState)
    this.googleVerifySub = this.googleVerify$.subscribe((googleAuthorization)=>{
      this.verify=googleAuthorization;
    })

    
  }


  logOut()
  { 
    // console.log("before reaching the if statement:",this.verify)
    if(this.verify)
    {
      this.googleServerStatusSub = this.googleCalSvc.revokeToken().subscribe({
        next:status=> console.log(status.status),
        error:err=>console.error(err)

      })
    }
    this.store.dispatch(LogOut());
    // console.log("After the if statement:",this.verify)
   
  }

  ngOnDestroy(): void {
    if(this.googleServerStatusSub)
    {
      this.googleServerStatusSub.unsubscribe();
    }
    this.googleVerifySub.unsubscribe()
  }

  
}
