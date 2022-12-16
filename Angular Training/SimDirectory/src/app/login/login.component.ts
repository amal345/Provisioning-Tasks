import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  private formSubmitAttempt!: boolean; 
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {


  }

  onSubmit() {
    
    const forms: any = {
      username: this.username,
      password: this.password
    }
    this.authService.login(forms);
    this.formSubmitAttempt = true;  
  }

}
