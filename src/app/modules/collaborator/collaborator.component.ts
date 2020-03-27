import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  // The data to be presented
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','banned', 'actions'];
  
  constructor(
    private collaboratorService: CollaboratorsService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.collaboratorService.getCollaborators().add(() => {
      this.dataSource = new MatTableDataSource<any>(this.collaboratorService.collaborators);
    });
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

  banCollaborator(id: string) {
    Swal.fire({
      title: 'Ban Collaborator',
      text: 'Are you sure you want to ban this collaborator?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.collaboratorService.banCollaborator(id).subscribe(
          () => {
            this.snackBar.open('Collaborator Banned', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  unbanCollaborator(id: string){
    Swal.fire({
      title: 'Unban Collaborator',
      text: 'Are you sure you want to unban this collaborator?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value){
        this.collaboratorService.unbanCollaborator(id).subscribe(
          () => {
            this.snackBar.open('Collaborator Unbanned', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  // removeCollaborator(id: string){
  //   Swal.fire({
  //     title: 'Remove Collaborator',
  //     text: 'Are you sure you want to remove this collaborator?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     showConfirmButton: true,
  //     showLoaderOnConfirm: true,
  //     confirmButtonColor: 'red',
  //   }).then((result) => {
  //     if (result.value){
  //       this.collaboratorService.removeCollaborator(id).subscribe(
  //         (response: string) => {
  //           this.dataSource._updateChangeSubscription();
  //           this.snackBar.open('Collaborator Removed', null, {
  //             duration: 2000
  //           });
  //         }
  //       );
  //     }
  //   });
  // }

}
