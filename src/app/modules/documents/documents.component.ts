import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DocumentMeta } from 'src/app/shared/models/documents.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  dataSource: MatTableDataSource<DocumentMeta>;
  displayedColumns: string[] = ['title', 'creator', 'published', 'actions'];
  tempDataSource: MatTableDataSource<DocumentMeta>;
  checkPublished = false;
  checkUnpublished = false;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
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
      title: 'Republish Document',
      text: `Enter the document id to confirm: ${id}`,
      input: 'text',
      inputValue: '',
      inputValidator: (value) =>{
        if (!value) {
          return 'No id given.';
        }
        if (value !== id) {
          return 'Invalid id.';
        }
      },
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.documentService.publishDocument(id).add(
          () => {
            this.snackBar.open('Document Republished', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  unpublishDoc(id: string) {
    Swal.fire({
      title: 'Unpublish Document',
      text: `Enter the document id to confirm: ${id}`,
      input: 'text',
      inputValue: '',
      inputValidator: (value) =>{
        if (!value) {
          return 'No id given.';
        }
        if (value !== id) {
          return 'Invalid id.';
        }
      },
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.documentService.unpublishDocument(id).add(
          () => {
            this.snackBar.open('Document Unpublished', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  previewDoc(docId: string) {
    this.router.navigate([`/preview/${docId}`])
  }
}
