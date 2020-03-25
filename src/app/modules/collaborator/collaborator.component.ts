import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  // The data to be presented
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(
    private collaboratorService: CollaboratorsService,
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
      if (result.value){
        this.collaboratorService.banCollaborator(id).add(
          () => {
            Swal.fire('Succesfully banned.', '', 'success');
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
        this.collaboratorService.unbanCollaborator(id).add(
          () => {
            Swal.fire('Succesfully unbanned', '', 'success');
          }
        );
      }
    });
  }

}
