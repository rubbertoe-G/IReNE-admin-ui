import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RevisionMeta } from 'src/app/shared/models/revision.model';
import { RevisionService } from 'src/app/shared/services/revision.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-documents',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss']
})
export class RevisionsComponent implements OnInit {

  dataSource: MatTableDataSource<RevisionMeta>;
  displayedColumns: string[] = ['date', '_id', 'title', 'creator', 'revType','actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private revisionService: RevisionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.revisionService.getRevisions().add(() => {
      this.dataSource =  new MatTableDataSource<RevisionMeta>(this.revisionService.revisions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  textFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  previewDoc(docId: string) {
    if(environment.testErrors)
      throw Error('ERROR: Unable to preview document.')
    this.router.navigate([`/preview/${docId}`])
  }
}

