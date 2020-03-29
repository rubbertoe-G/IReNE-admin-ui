import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RequestMeta } from 'src/app/shared/models/access-requests.model';

const ELEMENT_DATA: RequestMeta[] = [
  {requestNbr: 1, name: 'Roberto Guzman'},
  {requestNbr: 2, name: 'Roberto Guzman'},
  {requestNbr: 3, name: 'Roberto Guzman'},
  {requestNbr: 4, name: 'Roberto Guzman'},
  {requestNbr: 5, name: 'Roberto Guzman'},
  {requestNbr: 6, name: 'Roberto Guzman'},
  {requestNbr: 7, name: 'Roberto Guzman'},
  {requestNbr: 8, name: 'Roberto Guzman'},
  {requestNbr: 9, name: 'Roberto Guzman'},
  {requestNbr: 10, name: 'Roberto Guzman'},
  {requestNbr: 11, name: 'Roberto Guzman'},
  {requestNbr: 12, name: 'Roberto Guzman'},
  {requestNbr: 13, name: 'Roberto Guzman'},
  {requestNbr: 14, name: 'Roberto Guzman'},


];

@Component({
  selector: 'app-access-requests',
  templateUrl: './access-requests.component.html',
  styleUrls: ['./access-requests.component.scss']
})
export class AccessRequestsComponent implements OnInit {

  dataSource = new MatTableDataSource<RequestMeta>(ELEMENT_DATA);
  
  displayedColumns: string[] = ['requestNbr', 'name', 'actions'];
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  denyAccessRequest(request: RequestMeta) {
    Swal.fire({
      title: 'Deny Access Request',
      text: 'Are you sure you want to deny this access request?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.snackBar.open("The access request has been denied.",null,{duration:2000});
        let index = this.dataSource.data.indexOf(request);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  acceptAccessRequest(request: RequestMeta){
    Swal.fire({
      title: 'Accept Access Request',
      text: 'Are you sure you want to accept this access request?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'green',
    }).then((result) => {
      if (result.value) {
        this.snackBar.open("The access request has been accepted.",null,{duration:2000});
        let index = this.dataSource.data.indexOf(request);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });    
  }

}
