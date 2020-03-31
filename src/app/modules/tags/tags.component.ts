import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TagMeta } from 'src/app/shared/models/tags.model';
import { TagsService } from 'src/app/shared/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  dataSource = new MatTableDataSource<TagMeta>();
  displayedColumns: string[] = ['tagNbr', 'name', 'actions'];

  constructor( private tagsService: TagsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tagsService.getTags().add(() => {
      this.dataSource = new MatTableDataSource<any>(this.tagsService.tags);
    });
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
        this.tagsService.removeTag(tag.tagNbr.toString()).subscribe(
          () => {
            this.snackBar.open("The tag has been removed.",null,{duration:2000});
            let index = this.dataSource.data.indexOf(tag);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        );
      }
    });
  }
}
