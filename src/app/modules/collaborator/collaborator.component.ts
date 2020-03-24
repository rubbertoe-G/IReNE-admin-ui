import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface CollaboratorMeta {
  collabId: number;
  name: string;
}

const ELEMENT_DATA: CollaboratorMeta[] = [
  {collabId: 1, name: 'Roberto Guzman'},
  {collabId: 2, name: 'Roberto Guzman'},
  {collabId: 3, name: 'Roberto Guzman'},
  {collabId: 4, name: 'Roberto Guzman'},
  {collabId: 5, name: 'Roberto Guzman'},
  {collabId: 6, name: 'Roberto Guzman'},
  {collabId: 7, name: 'Roberto Guzman'},
  {collabId: 8, name: 'Roberto Guzman'},
  {collabId: 9, name: 'Roberto Guzman'},
  {collabId: 10, name: 'Roberto Guzman'},
  {collabId: 11, name: 'Roberto Guzman'},
  {collabId: 12, name: 'Roberto Guzman'},
  {collabId: 13, name: 'Roberto Guzman'},
  {collabId: 14, name: 'Roberto Guzman'},
];


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  dataSource = new MatTableDataSource<CollaboratorMeta>(ELEMENT_DATA);

  displayedColumns: string[] = ['collabId', 'name', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
