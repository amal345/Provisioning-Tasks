import {ConfirmDialogComponent} from '../confirm-dialog.component'
import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
@Injectable({
  providedIn: 'root'
})
export class ConfirmServicedService {

  constructor(private dialog:MatDialog) { }

  openConfirmDialog(msg: string){
   return this.dialog.open(ConfirmDialogComponent,{
       width:'390px',
       panelClass:'confirm-dialog-container',
       disableClose:true,
       data:{
         message:msg
       }
    })
  }
}
