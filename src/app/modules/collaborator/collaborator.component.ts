import { Component, OnInit } from '@angular/core';
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

  // The data to be presented
  dataSource = new MatTableDataSource<CollaboratorMeta>();
  tempDataSource: MatTableDataSource<CollaboratorMeta>;

  displayedColumns: string[] = ['firstName', 'lastName', 'email','banned', 'actions'];
  inputValue = '';
  checkBanned = false;
  checkUnbanned = false;
  
  constructor(
    private collaboratorService: CollaboratorsService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.collaboratorService.getCollaborators().add(() => {
      this.dataSource = new MatTableDataSource<CollaboratorMeta>(this.collaboratorService.collaborators);
      this.tempDataSource = this.dataSource;
    });
    console.log(window.location.port)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isBanned(banned: boolean) {
    if (banned) {
      return 'salmon';
    }
  }

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
