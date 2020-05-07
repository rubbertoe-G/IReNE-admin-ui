import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentMeta } from 'src/app/shared/models/documents.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<DocumentMeta>;
  displayedColumns: string[] = ['title', 'creator', 'published', 'actions'];
  tempDataSource: MatTableDataSource<DocumentMeta>;
  checkPublished = false;
  checkUnpublished = false;
  loading = true;
  selectedId = ' ';
  usingFilter = false;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.documentService.getDocuments().add(() => {
      this.dataSource = new MatTableDataSource<DocumentMeta>(this.documentService.documents);
      this.dataSource.paginator = this.paginator;
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
      this.dataSource.paginator = this.paginator;
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
      this.dataSource.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Publish Document',
        message: `The following action will re-publish the document with the following title: ${title.bold()}.\
          Please take notice that a banned collaborator's case study can be set to published.`,
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.selectedId = id;
        this.documentService.publishDocument(id, result).add(() => {
          this.selectedId = ' ';
        });
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
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Unpublish Document',
        message: `The following action will unpublish the document with the following title: ${title.bold()}.`
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.selectedId = id;
        this.documentService.unpublishDocument(id, result).add(() => {
          this.selectedId = ' ';
        });
      }
    });
  }

  previewDoc(docId: string) {
    this.router.navigate([`/documents/preview/${docId}`])
  }
}
