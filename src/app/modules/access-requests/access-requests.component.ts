import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RequestMeta } from 'src/app/shared/models/access-requests.model';
import { AccessRequestsService } from 'src/app/shared/services/access-requests.service';


@Component({
  selector: 'app-access-requests',
  templateUrl: './access-requests.component.html',
  styleUrls: ['./access-requests.component.scss']
})
export class AccessRequestsComponent implements OnInit {

  dataSource = new MatTableDataSource<RequestMeta>();
  
  displayedColumns: string[] = ['requestNbr', 'firstName', 'lastName', 'email','actions'];
  constructor(private requestsService: AccessRequestsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.requestsService.getRequests().add(() => {
      this.dataSource = new MatTableDataSource<any>(this.requestsService.requests);
    });
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
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.requestsService.denyRequest(request.id.toString()).subscribe(
          () => {
            this.snackBar.open("The access request has been denied.",null,{duration:2000});
            let index = this.dataSource.data.indexOf(request);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        );
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
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.requestsService.acceptRequest(request.id.toString()).subscribe(
          () => {
            this.snackBar.open("The access request has been accepted.",null,{duration:2000});
            let index = this.dataSource.data.indexOf(request);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        );
      }
    });    
  }

}
