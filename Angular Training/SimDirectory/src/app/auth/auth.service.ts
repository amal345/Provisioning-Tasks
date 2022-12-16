import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 header:BehaviorSubject<any>= new BehaviorSubject<any>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  
  constructor(private router:Router) { }

  login(user:any):any {
    if (user.username === "admin@gmail.com" && user.password === "admin" ||user.username==="amal@gmail.com" && user.password==="amal") {
      this.loggedIn.next(true);
      this.header.next(user.username);
      this.router.navigate(['/']);
    }  
    else {
          alert("Invalid username or password");
    
        }
  }
  getHeader(): Observable<any> {
    //the receiver component calls this function
    return this.header.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
 
}
