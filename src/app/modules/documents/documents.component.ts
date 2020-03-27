import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DocumentMeta } from 'src/app/shared/models/documents.model';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  dataSource: MatTableDataSource<DocumentMeta>;
  displayedColumns: string[] = ['id', 'creator', 'actions'];
  tempDataSource: MatTableDataSource<DocumentMeta>;
  checkPublished = false;
  checkUnpublished = false;

  constructor(
    private documentService: DocumentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.documentService.getDocuments().add(() => {
      this.dataSource =  new MatTableDataSource<DocumentMeta>(this.documentService.documents);
      this.tempDataSource = this.dataSource;
    });
  }

  textFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterPublished() {
    this.checkPublished = !this.checkPublished;
    if (this.checkPublished && !this.checkUnpublished) {
      const publishedData = new MatTableDataSource<DocumentMeta>();
      this.dataSource.data.forEach(e => {
        if (e.published) {
          publishedData.data.push(e);
        }
      });
      this.dataSource = publishedData;
      return;
    }
    this.dataSource = this.tempDataSource;
  }

  filterUnpublished() {
    this.checkUnpublished = !this.checkUnpublished;
    if (!this.checkPublished && this.checkUnpublished) {
      const publishedData = new MatTableDataSource<DocumentMeta>();
      this.dataSource.data.forEach(e => {
        if (e.published === false) {
          publishedData.data.push(e);
        }
      });
      this.dataSource = publishedData;
      return;
    }
    this.dataSource = this.tempDataSource;
  }

  isUnpublished(unpublished: boolean) {
    if (!unpublished) {
      return 'salmon';
    }
  }

  publishDoc(id: string) {
    Swal.fire({
      title: 'Publish Document',
      text: 'Are you sure you want to publish this document?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.documentService.publishDocument(id).add(
          () => {
            this.snackBar.open('Document published.', null, {
              duration: 2000
            });
          }
        )
      }
    });
  }

  unpublishDoc(id: string) {
    Swal.fire({
      title: 'Unpublish Document',
      text: 'Are you sure you want to unpublish this document?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.documentService.unpublishDocument(id).add(
          () => {
            this.snackBar.open('Document unpublished.', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  previewDoc(id: string) {
  }
}
