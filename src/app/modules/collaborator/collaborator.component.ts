import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CollaboratorMeta } from 'src/app/shared/models/collaborators.model';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  /**
   * The collaborators data
   */
  dataSource = new MatTableDataSource<CollaboratorMeta>();

  /**@ignore */
  tempDataSource: MatTableDataSource<CollaboratorMeta>;

  /**@ignore */
  displayedColumns: string[] = ['first_name', 'last_name', 'email','banned', 'actions'];

  /**
   * The value to be used from the input search filter.
   */
  inputValue = '';
  
  /**
   * Hold the state value of the "Banned" checkbox.
   */
  checkBanned = false;

  /**
   * Hold the state value of the "Unbanned" checkbox.
   */
  checkUnbanned = false;

  loading = true;
  
  constructor(
    private collaboratorService: CollaboratorsService,
    private snackBar: MatSnackBar
    ) { }

  
  ngOnInit(): void {
    this.collaboratorService.getCollaborators().add(() => {
      this.dataSource = new MatTableDataSource<CollaboratorMeta>(this.collaboratorService.collaborators);
      this.tempDataSource = this.dataSource;
      this.loading = false;
    });
  }


  /**
   * Filters the table information based on the filter event value.
   * 
   * @param event the search input event.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Filters the table information with the banned collaborators.
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
      return;
    }
    this.dataSource = this.tempDataSource;
  }

  /**
   * Filters the table information with the unbanned collaborators. 
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
      return;
    }
    this.dataSource = this.tempDataSource;
  }


  /**
   * Ban a collaborator. Perform http request to ban a specific collaborator using the collaborator id.
   * 
   * @param id the id of the collaborator to be banned.
   * @param email the email of the collaborator to be banned.
   */
  banCollaborator(id: string, email: string) {
    Swal.fire({
      title: 'Ban Collaborator',
      text: `Enter admin password to ban collaborator with email: "${email}"`,
      input: 'password',
      inputPlaceholder:'password',
      inputValue: '',
      inputValidator: (value) =>{
        if (!value) {
          return 'No id given.';
        }
      },
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black'
    }).then((result) => {
      if (result.value) {
        this.collaboratorService.banCollaborator(id).add(
          () => {
            this.snackBar.open('Collaborator Banned', null, {
              duration: 3000
            });
          }
        );
      }
    });
  }


  /**
   * Unban a collaborator. Perform http request to unban a specific collaborator using the collaborator id.
   * 
   * @param id the id of the collaborator.
   * @param email the email of the collaborator.
   */
  unbanCollaborator(id: string, email: string){
    Swal.fire({
      title: 'Unban Collaborator',
      text: `Enter administrator password to unban collaborator with email: "${email}"`,
      input: 'password',
      inputPlaceholder:'password',
      inputValue: '',
      inputValidator: (value) => {
        if (!value) {
          return 'No password given.';
        }
      },
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value){
        this.collaboratorService.unbanCollaborator(id).add(
          () => {
            this.snackBar.open('Collaborator Unbanned', null, {
              duration: 3000
            });
          }
        );
      }
    });
  }
}
