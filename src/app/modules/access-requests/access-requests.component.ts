import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestMeta } from 'src/app/shared/models/access-requests.model';
import { AccessRequestsService } from 'src/app/shared/services/access-requests.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';


/**
 * Component that manages the operations concerning the access requests.
*/
@Component({
  selector: 'app-access-requests',
  templateUrl: './access-requests.component.html',
  styleUrls: ['./access-requests.component.scss']
})
export class AccessRequestsComponent implements OnInit {
  loading = true;

  selectedId = '';

  /**
  *Data to be displayed in the view.
  */
  dataSource = new MatTableDataSource<RequestMeta>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
  *Column fields of the model to be displayed in the table.
  */
  displayedColumns: string[] = ['_id', 'first_name', 'last_name', 'email', 'actions'];

  /**
   * Construct the Access Request component with an Access Request service and a Material Snackbar.
   * 
   * @param {AccessRequestsService} requestsService Access request service
   * @param {MatSnackBar} snackBar Angular material snackbar
   */
  constructor(
    private requestsService: AccessRequestsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  /**
   * Initializes the datasource by requesting the Access Request from the server.
   * 
   */
  ngOnInit(): void {
    this.requestsService.getRequests().add(() => {
      this.dataSource = new MatTableDataSource<any>(this.requestsService.requests);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  /**
  * Event manager of the search bar. Takes the input and filters the table accordingly.
  * 
  * @param {Event} event Event to be managed
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /**
 * Denies the Access Request chosen by the user.
 * 
 * @param {RequestMeta} request Request chosen by the user.
 */
  denyAccessRequest(request: RequestMeta) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Deny Access Request',
        message: `The following action will deny and remove the collaborator access-request with the email: ${request.email.bold()}.`,
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.selectedId = request._id.toString();
        this.requestsService.denyRequest(request._id.toString(), result).subscribe(
          () => {
            this.snackBar.open("The access request has been denied.", null, { duration: 2000 });
            let index = this.dataSource.data.indexOf(request);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.selectedId = '';
          },
          (error) => {
            this.selectedId = '';
          }
        );
      }
    });
  }


  /**
   * Accepts the Access Request chosen by the user.
   * 
   * @param {RequestMeta} request Request chosen by the user.
   */
  acceptAccessRequest(request: RequestMeta) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Accept Access Request',
        message: `The following action will create and grant access to a new collaborator with the email: ${request.email.bold()}.`,
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        console.log(result)
        this.selectedId = request._id.toString();
        this.requestsService.acceptRequest(request._id.toString(), result).subscribe(
          () => {
            this.snackBar.open("The access request has been accepted.", null, { duration: 2000 });
            let index = this.dataSource.data.indexOf(request);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.selectedId = '';
          },
          (error) => {
            this.selectedId = '';
          }
        );
      }
    });
  }
}
