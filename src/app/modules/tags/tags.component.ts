import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TagMeta } from 'src/app/shared/models/tags.model';
import { TagsService } from 'src/app/shared/services/tags.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';

/**
* Component that manages the operations concerning the tags in the system.
*/
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  loading = true;
  
  /**
  *Data to be displayed in the view.
  */
  dataSource = new MatTableDataSource<TagMeta>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
  *Column fields of the model to be displayed in the table.
  */
  displayedColumns: string[] = ['_id', 'tagItem', 'actions'];

   /**
   * Construct the Access Request component with an Access Request service and a Material Snackbar.
   * 
   * @param {TagsService} tagsService Tags service from which to get the data
   * @param {MatSnackBar} snackBar Angular material snackbar
   */
  constructor(
    private tagsService: TagsService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  /**
   * Initializes the datasource by requesting the Tags from the server.
   */
  ngOnInit(): void {
    this.tagsService.getTags().add(() => {
      this.dataSource = new MatTableDataSource<any>(this.tagsService.tags);
      this.dataSource.paginator = this.paginator;
      this.loading= false;
    });
  }

  /**
   * Event manager of the search bar. Takes the input and filters the table accordingly.
   * 
   * @param {Event} event Event to be managed
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Removes a Tag chosen by the user.
   * 
   * @param {TagMeta} tag Tag chosen by the user.
   */
  removeTag(tag: TagMeta) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Remove Tag',
        message: `The following action will remove the following tag from the database: ${tag.tagItem.bold()}. This will also\
          remove this tag from all documents that use it.`
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.tagsService.removeTag(tag._id.toString(), result).subscribe(
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
