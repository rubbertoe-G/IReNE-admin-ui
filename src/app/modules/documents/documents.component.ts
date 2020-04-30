import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DocumentMeta } from 'src/app/shared/models/documents.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


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
  loading = true;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.documentService.getDocuments().add(() => {
      this.dataSource =  new MatTableDataSource<DocumentMeta>(this.documentService.documents);
      this.tempDataSource = this.dataSource;
      this.loading = false;
    });
  }

  textFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  filterPublished() {
    this.checkUnpublished = false;
    if (this.checkPublished && !this.checkUnpublished) {
      const publishedData = new MatTableDataSource<DocumentMeta>();
      this.tempDataSource.data.forEach(e => {
        if (e.published === true) {
          publishedData.data.push(e);
        }
      });
      this.dataSource = publishedData;
      return;
    }
    this.dataSource = this.tempDataSource;
  }

  filterUnpublished() {
    this.checkPublished = false;
    if (!this.checkPublished && this.checkUnpublished) {
      const publishedData = new MatTableDataSource<DocumentMeta>();
      this.tempDataSource.data.forEach(e => {
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

  /**
   * 
   * 
   * @param id the id of the document.
   * @param title the title of the document.
   */
  publishDoc(id: string, title: string) {
    Swal.fire({
      title: 'Republish Document',
      text: `Enter password to confirm republishing of document: "${title}"`,
      input: 'password',
      inputPlaceholder:'password',
      inputValue: '',
      inputValidator: (value) =>{
        if (!value) {
          return 'Password field empty';
        }
      },
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#37474f'
    }).then((result) => {
      if (result.value) {
        this.documentService.publishDocument(id).add(
          () => {
            this.dataSource =  new MatTableDataSource<DocumentMeta>(this.documentService.documents);
            this.tempDataSource = this.dataSource;
            this.snackBar.open('Document Republished', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  /**
   * Set a document to be unpublised.
   * 
   * @param id the id of the document.
   * @param title the title of the document.
   */
  unpublishDoc(id: string, title: string) {
    Swal.fire({
      title: 'Unpublish Document',
      text: `Enter password to confirm republishiing of document: "${title}"`,
      input: 'password',
      inputPlaceholder:'password',
      inputValue: '',
      inputValidator: (value) =>{
        if (!value) {
          return 'Password field empty';
        }
      },
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#37474f'
    }).then((result) => {
      if (result.value) {
        this.documentService.unpublishDocument(id).add(
          () => {
            

            this.dataSource = new MatTableDataSource<DocumentMeta>(this.documentService.documents);
            this.snackBar.open('Document Unpublished', null, {
              duration: 2000
            });
          }
        );
      }
    });
  }

  previewDoc(docId: string) {
    if(environment.testErrors)
      throw Error('ERROR: Unable to preview document.')
    this.router.navigate([`/preview/${docId}`])
  }
}
