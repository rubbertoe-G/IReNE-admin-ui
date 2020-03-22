import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface RequestMeta {
  requestNbr: number;
  name: string;
}

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
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
