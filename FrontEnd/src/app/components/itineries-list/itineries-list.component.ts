import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, Subscription } from 'rxjs';
import { LoginState } from '../Authentication/state/auth.state';
import { isLoginRegistered } from '../Authentication/state/auth.selector';
import { addItineraryCalendar, deleteItinerary, retrieveItineriesList } from './state/itineriesList.action';
import { getItineraryAddCalendar, getItineriesList } from './state/itineriesList.selector';
import { itineraryInfo } from '../../Models/ItineraryInfoModel';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { getMongoResponseAction } from '../view-itinerary/state/viewItinerary.action';
import { setLoadingSpinner } from '../shared/state/shared.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itineries-list',
  templateUrl: './itineries-list.component.html',
  styleUrl: './itineries-list.component.css'
})
export class ItineriesListComponent implements OnDestroy,AfterViewInit {

  //LOGINState
  loginState$!:Observable<LoginState>
  loginStateSub!:Subscription
  username!:string

  //ItineriesList
  itineriesList$!:Observable<itineraryInfo[]|null>
  itineriesListSub!:Subscription
  displayedColumns!:string[]


  listData!:MatTableDataSource<any>
  

  constructor(private store:Store<AppState>, private _liveAnnouncer:LiveAnnouncer, private router:Router)
  {
    this.loginState$=this.store.select(isLoginRegistered)
    this.loginStateSub = this.loginState$.subscribe((loginState)=>{
      if(loginState.username)
      {
        this.username=loginState.username
      }
      });

    this.displayedColumns = ['No.','ItineraryTitle', 'startDate', 'endDate','dateCreated','action'];

}
  ngAfterViewInit(): void {
    this.store.dispatch(retrieveItineriesList({email:this.username}))
    this.itineriesListSub = this.store.select(getItineriesList).subscribe(list=>{

      if(list)
      { 
        this.listData = new MatTableDataSource(list);
      }
    })
  }
  ngOnDestroy(): void {
    this.loginStateSub.unsubscribe();
    this.itineriesListSub.unsubscribe();
  }



  delete(ID:string)
{ 

  this.store.dispatch(deleteItinerary({itineraryID:ID,email:this.username}))
  console.log(ID);
}

titleClick(title:string,itineraryID:string)
{
  this.store.dispatch(setLoadingSpinner({status:true}))
  this.store.dispatch(getMongoResponseAction({title:title,itineraryID:itineraryID}))

}

addToCalendar(title:string,startDate:string,endDate:string)
{
  // console.log(title,startDate,endDate);
  this.store.dispatch(addItineraryCalendar({itineraryTitle:title,startDate:startDate,endDate:endDate}));
  // this.store.select(getItineraryAddCalendar).subscribe((calendarForm)=>{
  //   console.log(calendarForm);
  // })
  this.router.navigate(['/calendar']);
  
}


}
