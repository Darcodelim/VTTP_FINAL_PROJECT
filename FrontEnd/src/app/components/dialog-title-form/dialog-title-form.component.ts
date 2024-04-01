import { Component } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { addTitle } from './state/dialog.action';

@Component({
  selector: 'app-dialog-title-form',
  templateUrl: './dialog-title-form.component.html',
  styleUrl: './dialog-title-form.component.css'
})
export class DialogTitleFormComponent {

  constructor(private store:Store<AppState>)
  {

  }

  onSubmit(title:string)
  {
      this.store.dispatch(addTitle({title:title}));
  }
}
