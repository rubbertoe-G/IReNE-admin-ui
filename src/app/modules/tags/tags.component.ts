import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

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

  removeTag(tag: TagMeta) {
    Swal.fire({
      title: 'Delete Tag',
      text: 'Are you sure you want to delete this tag?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: "The tag has been deleted.",
          showConfirmButton: false,
          timer: 1500
        })
        let index = this.dataSource.data.indexOf(tag)
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }
}
