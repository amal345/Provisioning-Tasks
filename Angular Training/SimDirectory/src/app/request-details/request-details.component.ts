import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {
  userName: string;
  requestedSim: any = []
  Completed: String = "Completed"
  Cancelled = "Cancelled"
  status={}
  

  constructor(private authservice: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => { this.ngOnInit() }, 1000 * 5)
    let key: string
    this.authservice.getHeader().subscribe((header) => {
      this.userName = header;
    })

    if (this.userName === "admin@gmail.com") {
      key = "getAll"
    }
    else {
      key = this.userName
    }
    this.http.get(`http://localhost:5000/request/getrequest/${key}`).subscribe(requestSim => {
      this.requestedSim = requestSim
      this.requestedSim.forEach((element) => {
      element.requestedDate = moment(element.requestedDate).local().format('MM/DD/YYYY')
      })

    })


  }
  onSubmit(click) {
    const id=click.target.id
    this.status={
      status:"Cancelled"
    }
    if (confirm(`Are you sure do you want to cancell the request `))
    this.updaterequest(this.status, id)
    console.log(id);
    
  }

  async updaterequest(status,id){
    this.http.put(`http://localhost:5000/request//update/${id}`,status).subscribe(res=>{
      alert(JSON.stringify(res))
    })
    
  
  }

}
