import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { DocumentMeta } from 'src/app/shared/models/documents.model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  /**
   * MatPaginator variable used to provide navigation between paged information in the data table. 
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   * MatTableDataSource<DocumentMeta> type object instance to store a table representation of the
   * documents
   */
  dataSource = new MatTableDataSource<DocumentMeta>();

  
  tempDataSource = new MatTableDataSource<DocumentMeta>();
  
  /**
   * String array that contains the values to be represented in the table columns. These values mirror the data
   * from the MatTableDataSource<DocumentMeta>.
   */
  displayedColumns: string[] = ['title', 'creator', 'published', 'actions'];
  
  /**
   * Variable used to bind the value of the "published" checkbox on this component html file.
   */
  checkPublished = false;

  /**
   * Variable used to bind the value of the "unpublished" checkbox on this component html file.
   */
  checkUnpublished = false;

  /**
   * Variable used to set the state of a request in progress. Used to show or hide html elements depending on the value of
   * said variable.
   */
  loading = true;

  /**
   * Variable used to set the temprary value of a selected element.
   */
  selectedId = ' ';

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
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
          this.snackBar.open("The document has been published.", null, { duration: 2000 });
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
          this.snackBar.open("The document has been unpublished.", null, { duration: 2000 });
        });
      }
    });
  }

  previewDoc(docId: string) {
    this.router.navigate([`/documents/preview/${docId}`])
  }
}
