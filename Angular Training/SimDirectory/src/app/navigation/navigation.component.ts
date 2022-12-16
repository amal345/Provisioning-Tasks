import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../auth/auth.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn!: Observable<boolean>;
  userName: string;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.authservice.isLoggedIn;
    this.authservice.getHeader().subscribe((header) => {
      this.userName=header;
      
    })
    // 
    
  
  }

  onlogout(){
    console.log(this.userName);
    this.authservice.logout()
  }

}
