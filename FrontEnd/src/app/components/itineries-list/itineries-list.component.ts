import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, Subscription } from 'rxjs';
import { LoginState } from '../Authentication/state/auth.state';
import { isLoginRegistered } from '../Authentication/state/auth.selector';
import { deleteItinerary, retrieveItineriesList } from './state/itineriesList.action';
import { getItineriesList } from './state/itineriesList.selector';
import { itineraryInfo } from '../../Models/ItineraryInfoModel';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { getMongoResponseAction } from '../view-itinerary/state/viewItinerary.action';
import { setLoadingSpinner } from '../shared/state/shared.action';

@Component({
  selector: 'app-itineries-list',
  templateUrl: './itineries-list.component.html',
  styleUrl: './itineries-list.component.css'
})
export class ItineriesListComponent implements OnDestroy {

  //LOGINState
  loginState$!:Observable<LoginState>
  loginStateSub!:Subscription
  username!:string

  //ItineriesList
  itineriesList$!:Observable<itineraryInfo[]|null>
  displayedColumns!:string[]

  @ViewChild(MatSort) sort!: MatSort;
  listData!:MatTableDataSource<any>
  

  constructor(private store:Store<AppState>, private _liveAnnouncer:LiveAnnouncer)
  {
    this.loginState$=this.store.select(isLoginRegistered)
    this.loginStateSub = this.loginState$.subscribe((loginState)=>{
      if(loginState.username)
      {
        this.username=loginState.username
      }
      });

    this.store.dispatch(retrieveItineriesList({email:this.username}))
    this.store.select(getItineriesList).subscribe(list=>{

      if(list)
      {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
      }
    })
    
    


    this.displayedColumns = ['No.','ItineraryTitle', 'startDate', 'endDate','dateCreated','action'];

}
  ngOnDestroy(): void {
    this.loginStateSub.unsubscribe();
  }

announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    console.log("sorted ending");
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
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


}
