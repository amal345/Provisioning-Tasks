import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
   },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'requestdetail',
    component: RequestDetailsComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
