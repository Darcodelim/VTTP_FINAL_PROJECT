import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GPTComponent } from './components/gpt/gpt.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { LoginComponent } from './components/Authentication/login/login.component';
import { SignUpComponent } from './components/Authentication/sign-up/sign-up.component';


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"search",component:SearchFormComponent},
  {path:"itinerary",component:GPTComponent},
  {path:'**',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
