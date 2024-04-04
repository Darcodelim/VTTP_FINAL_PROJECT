import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Materials
import{MatFormFieldModule}from '@angular/material/form-field'; 
import{MatInputModule} from'@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule} from '@angular/material/dialog';

import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTableModule,
    MatNativeDateModule,
    // MatLuxonDateModule,
    MatAutocompleteModule,
    MatDialogModule,MatSortModule
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTableModule,
    MatNativeDateModule,//swap to this, as luxon date object is different from JavaScript date object
    // MatLuxonDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSortModule
    
  ]
  ,
  providers:[{provide: MAT_DATE_LOCALE,useValue:'en-GB'}]
})
export class MaterialModuleModule {   


}
