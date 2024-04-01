import { Component } from '@angular/core';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { geterror } from './components/Authentication/state/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';

  errorMessage!:Observable<string|null>;

  constructor(private store:Store<AppState>)
  {
      this.errorMessage = this.store.select(geterror)
  }

}
