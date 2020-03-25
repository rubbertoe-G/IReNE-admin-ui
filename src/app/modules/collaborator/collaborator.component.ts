import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';


export interface CollaboratorMeta {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
}

let elementData: CollaboratorMeta[] = [
  {id: 'aq9zI01ORNE9Okyziblp', firstName: 'Roberto', lastName: 'Guzman', email: 'roberto.guzman3@upr.edu', banned: true},
  {id: '66BuIJ0kNTYPDGz405qb', firstName: 'Yomar', lastName: 'Ruiz', email: 'yomar.ruiz@upr.edu', banned: false},
  {id: 'W0SUHONPhPrkrvL3ruxj', firstName: 'Jainel', lastName: 'Torres', email: 'jainel.torrer@upr.edu', banned: false},
  {id: 'zOHEzUyIKZB3LsAiu2Kb', firstName: 'Alberto', lastName: 'Canela', email: 'alberto.canela@upr.edu', banned: false},
  {id: '9XIu1jT96A5qz1Kpl90R', firstName: 'Alejandro', lastName: 'Vasquez', email: 'alejandro.vasquez@upr.edu', banned: false},
  {id: 'jEFgdhchAjyVhJikg17s', firstName: 'Don', lastName: 'Quijote', email: 'don.quijote@upr.edu', banned: true},
];


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  // The data to be presented
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(private collaboratorService: CollaboratorsService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CollaboratorMeta>(this.collaboratorService.getCollaborators());
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
      text: 'Are you sure you want to remove this collaborator?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
      // preConfirm: // http request here,
      preConfirm: () => {
        return this.collaboratorService.banCollaborator(id);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value){
        Swal.fire('Collaborator Banned', '', 'success');
      }
    });
  }

  unbanCollaborator(id: string){
    Swal.fire({
      title: 'Ban Collaborator',
      text: 'Are you sure you want to remove this collaborator?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
      // preConfirm: // http request here,
      preConfirm: () => {
        return this.collaboratorService.unbanCollaborator(id);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value){
        Swal.fire('Collaborator Unbanned', '', 'success');
      }
    });
  }

}
