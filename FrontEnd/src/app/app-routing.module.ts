import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GPTComponent } from './components/gpt/gpt.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

const routes: Routes = [
  {path:"",component:SearchFormComponent},
  {path:"itinerary",component:GPTComponent},
  {path:'**',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
