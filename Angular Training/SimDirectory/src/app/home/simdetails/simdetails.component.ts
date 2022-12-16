import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmServicedService } from 'src/app/confirm-dialog/service/confirm-serviced.service';

@Component({
  selector: 'app-simdetails',
  templateUrl: './simdetails.component.html',
  styleUrls: ['./simdetails.component.css']
})
export class SimdetailsComponent implements OnInit {



  parentSelector: boolean = false;
  simdetails: any = []
  Active: string = "Active"
  Stock: string = "Stock"
  Deactive: string = "Deactive"
  state: string
  userName: string
  Activation: string = "Activation"
  Reactivation: string = "Reactivation"
  Deactivation: string = "Deactivation"
  user: any = {}
  simNumber: string
  simState: string
  simOwner: string



  constructor(private authservice: AuthService,
     private http: HttpClient, 
     private router: Router,
     private dialogservice:ConfirmServicedService) { }



  ngOnInit(): void {


    this.authservice.getHeader().subscribe((header) => {
      this.userName = header;
    });

    if (this.userName === "admin@gmail.com") {
      this.user = { admin: true }
    }
    this.http.get('http://localhost:3000/status/Getall').subscribe((sims: any) => {
      this.simdetails = sims;
      for (const key in this.simdetails) {
        if (Object.prototype.hasOwnProperty.call(this.simdetails, key)) {
          this.simdetails[key].select = false;
          this.simdetails[key].checking = false;
        }
      }
    })

    this.addSimDetails()
  }




  onChangeSim(check) {
    const id = check.target.id;
    const ischecked = check.target.checked;
    this.state = check.target.value;
    let count = 0;

    this.simdetails = this.simdetails.map((Simcheck) => {
      if (Simcheck.id == id) {
        Simcheck.select = ischecked;
        return Simcheck;
      }
      return Simcheck
    })

    this.simdetails.forEach(item => {
      if (!item.select) {
        count++;
      }
    });
    for (const key in this.simdetails) {
      if (Object.prototype.hasOwnProperty.call(this.simdetails, key)) {
        if (count === this.simdetails.length) {
          this.simdetails[key].checking = false;
        }
        else if (this.simdetails[key].state !== this.state) {
          this.simdetails[key].checking = true;
        }
      }
    }
  }





  async onRequestSubmit(check) {
    let request: any = {};
    let selectedSims: any = [];
    const requestCategory = check.target.value;
    const requestSent: any = []
    // if (confirm(`Are you sure to ${requestCategory} the sim `)) {
    //   for (const key in this.simdetails) {
    //     if (Object.prototype.hasOwnProperty.call(this.simdetails, key)) {
    //       if (this.simdetails[key].select) {
    //         selectedSims.push(this.simdetails[key])
    //       }
    //     }
    //   }
    //   if (selectedSims.length > 0) {
    //     for (const iterator of selectedSims) {
    //       request = {
    //         simNumber: iterator.simNumber,
    //         requestCategory: requestCategory,
    //         requestedBy: this.userName

    //       }
    //       requestSent.push(request)
    //     }
    //     ;
    //     this.createRequest(requestSent)
    //     selectedSims = [];

    //   }
    //   else {
    //     alert("Sim is not selected")
    //   }
    // }
    this.dialogservice.openConfirmDialog(`Are you sure to ${requestCategory} the sim `)
    .afterClosed().subscribe(res => {
      if(res){
        for (const key in this.simdetails) {
              if (Object.prototype.hasOwnProperty.call(this.simdetails, key)) {
                if (this.simdetails[key].select) {
                  selectedSims.push(this.simdetails[key])
                }
              }
            }
            if (selectedSims.length > 0) {
              for (const iterator of selectedSims) {
                request = {
                  simNumber: iterator.simNumber,
                  requestCategory: requestCategory,
                  requestedBy: this.userName
      
                }
                requestSent.push(request)
              }
              ;
              this.createRequest(requestSent)
              selectedSims = [];
      
            }
            else {
              alert("Sim is not selected")
            }
      }
      
    })
  }


  createRequest(payload: any) {
    this.http.post<any>('http://localhost:5000/request/insert', payload).subscribe(res => {
      alert(JSON.stringify(res))
    })
    setTimeout(() => { this.ngOnInit() }, 1000 * 5)

  }
  addSimDetails() {
    this.simState = "Stock"
    this.simOwner = this.userName
  }

  onAddSim() {
    let validateNumber: boolean
    const simDetails = {
      phnnumber: this.simNumber,
      state: this.simState,
      owner: this.simOwner
    }
    validateNumber = (/^\d{10}$/.test(simDetails.phnnumber))
    if (!validateNumber) {
      alert("Valid Number")
    }
    else {
      this.createSim(simDetails)
      this.simNumber = null
      setTimeout(() => { this.ngOnInit() }, 1000 * 5)
    }
  }

  createSim(payload: any) {
    this.http.post<any>('http://localhost:3000/status/insert', payload).subscribe(response => {
      alert(JSON.stringify(response))
    })
  }


  
}
