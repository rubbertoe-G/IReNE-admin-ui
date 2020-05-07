import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import { CollaboratorMeta } from 'src/app/shared/models/collaborators.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * MatTableDataSource<CollaboratorMeta> type data to store a table representation of the
   * collaborators
   */
  dataSource = new MatTableDataSource<CollaboratorMeta>();

  /**@ignore */
  private tempDataSource: MatTableDataSource<CollaboratorMeta>;

  /**@ignore */
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'banned', 'actions'];

  /**
   * Hold the state value of the "Banned" checkbox.
   */
  checkBanned = false;

  /**
   * Hold the state value of the "Unbanned" checkbox.
   */
  checkUnbanned = false;

  /**
   * Value used to denote that a request is being performed. When active it will trigger the ngIf directive
   * to either display or hide html elements.
   */
  loading = true;

  /**
   * Value used to temprarily store the id of the selected collaborator. When active it will trigger the ngIf directive
   * to either display or hide html elements that use this variable.
   */
  selectedId = ' ';

  /**
   * Contructor of the collaborator component instance.
   * 
   * @param collaboratorService angular service object use to perform http requests related to a collaborator.
   */
  constructor(
    private collaboratorService: CollaboratorsService,
    private dialog: MatDialog
  ) { }

  /**
   * Initialize this compmonent object.
   */
  ngOnInit(): void { }

  /**
   * Function triggered after all html entities have been compleatly loaded. Performs http request to retrive all the
   * collaborators on the database.
   */
  ngAfterContentInit() {
    this.collaboratorService.getCollaborators().add(() => {
      this.dataSource = new MatTableDataSource<CollaboratorMeta>(this.collaboratorService.collaborators);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.tempDataSource = this.dataSource;
      this.loading = false;
    });
  }


  /**
   * Filters the table information based on the filter event value.
   *
   * @param event the search input event from the search bar.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Filters the table information with the banned collaborators. Works mutually exclusively with the
   * "checkUnbanned" variable.
   */
  filterBanned() {
    this.checkUnbanned = false;
    if (this.checkBanned && !this.checkUnbanned) {
      const publishedData = new MatTableDataSource<CollaboratorMeta>();
      this.tempDataSource.data.forEach(e => {
        if (e.banned === true) {
          publishedData.data.push(e);
        }
      });
      this.dataSource = publishedData;
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.dataSource = this.tempDataSource;
  }

  /**
   * Filters the table information with the unbanned collaborators.Works mutually exclusively with the
   * "checkBanned" variable.
   */
  filterUnbanned() {
    this.checkBanned = false;
    if (!this.checkBanned && this.checkUnbanned) {
      const publishedData = new MatTableDataSource<CollaboratorMeta>();
      this.tempDataSource.data.forEach(e => {
        if (e.banned === false) {
          publishedData.data.push(e);
        }
      });
      this.dataSource = publishedData;
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.dataSource = this.tempDataSource;
  }



  /**
   * Unban a collaborator. Perform http request to unban a specific collaborator using the collaborator id.
   * The function passes the collaborator id value to the collaboratorService to perform request.
   *
   * @param id the id of the collaborator.
   * @param email the email of the collaborator.
   */
  unbanCollaborator(id: string, email: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Unban Collaborator',
        message: `The following action will re-establish access to the collaborator with the email: ${email.bold()}.\n
          This action will also set to <b>published</b> all documents created by said collaborator.`,
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result != null) {
        this.selectedId = id;
        this.collaboratorService.unbanCollaborator(id, result).add(() => {
          this.selectedId = null;
        });
      }
    });
  }


  /**
   * Ban a collaborator. Open a dialog box and upon confirmation perform http request to ban a 
   * specific collaborator using the collaborator id. The function passes the collaborator id value 
   * to the collaboratorService to perform request.
   * @param id the id of the collaborator to be banned.
   * @param email the email of the collaborator to be banned.
   */
  banCollaborator(id: string, email: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Ban Collaborator',
        message: `The following action will revoke access to the collaborator with the email: ${email.bold()}.\n
          This action will also set to <b>unpublished</b> all documents created by said collaborator.`,
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        console.log(result)
        this.selectedId = id;
        this.collaboratorService.banCollaborator(id, result).add(() => {
          this.selectedId = null;
        });
      }
    });
  }
}
