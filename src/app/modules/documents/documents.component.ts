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

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'creator', 'actions'];

  constructor(
    private documentService: DocumentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.documentService.getDocuments().add(() => {
      this.dataSource =  new MatTableDataSource<DocumentMeta>(this.documentService.documents);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
