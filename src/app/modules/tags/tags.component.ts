import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface TagMeta {
  tagNbr: number;
  name: string;
}

const ELEMENT_DATA: TagMeta[] = [
  {tagNbr: 1, name: 'Electric'},
  {tagNbr: 2, name: 'Chaldish Gambino'},
  {tagNbr: 3, name: 'Miss Keesha'},
  {tagNbr: 4, name: 'Don Quijote'},
  {tagNbr: 5, name: 'Volatile'},
];

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  dataSource = new MatTableDataSource<TagMeta>(ELEMENT_DATA);

  displayedColumns: string[] = ['tagNbr', 'name', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
