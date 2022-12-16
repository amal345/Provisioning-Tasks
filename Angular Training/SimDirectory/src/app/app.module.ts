import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SimdetailsComponent } from './home/simdetails/simdetails.component';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmServicedService } from './confirm-dialog/service/confirm-serviced.service';
// import {MaterialModule} from './material/material.module'
import {MatDialogModule} from '@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    SimdetailsComponent,
    RequestdetailsComponent,
    RequestDetailsComponent,
    ConfirmDialogComponent
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
  
    MatDialogModule

  ],
  exports: [  
 
],
  providers: [AuthService,AuthGuard,ConfirmServicedService],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent]
})
export class AppModule { }
