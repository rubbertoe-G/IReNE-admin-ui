import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface DocumentMeta {
  docId: number;
  creator: string;
}

const ELEMENT_DATA: DocumentMeta[] = [
  {docId: 1, creator: 'Roberto Guzman'},
  {docId: 2, creator: 'Roberto Guzman'},
  {docId: 3, creator: 'Roberto Guzman'},
  {docId: 4, creator: 'Roberto Guzman'},
  {docId: 5, creator: 'Roberto Guzman'},
  {docId: 6, creator: 'Roberto Guzman'},
  {docId: 7, creator: 'Roberto Guzman'},
  {docId: 8, creator: 'Roberto Guzman'},
  {docId: 9, creator: 'Roberto Guzman'},
  {docId: 10, creator: 'Roberto Guzman'},
  {docId: 11, creator: 'Roberto Guzman'},
  {docId: 12, creator: 'Roberto Guzman'},
  {docId: 13, creator: 'Roberto Guzman'},
  {docId: 14, creator: 'Roberto Guzman'},


];


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  dataSource = new MatTableDataSource<DocumentMeta>(ELEMENT_DATA);

  displayedColumns: string[] = ['docId', 'creator', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
