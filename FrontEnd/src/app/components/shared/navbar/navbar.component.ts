import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { LogOut } from '../state/shared.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router:Router,private store:Store<AppState>)
  {

  }

  logOut()
  {
    this.store.dispatch(LogOut());
  }
}
