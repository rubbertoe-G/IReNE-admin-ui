import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RevisionMeta } from 'src/app/shared/models/revision.model';
import { CreationMeta } from 'src/app/shared/models/creation.model';
import { RevisionService } from 'src/app/shared/services/revision.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { DescriptionMeta } from 'src/app/shared/models/description.model';
import { AnyARecord } from 'dns';

var revisionSelected: RevisionMeta;
@Component({
  selector: 'app-documents',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss']
})
export class RevisionsComponent implements OnInit {

  dataSource: MatTableDataSource<RevisionMeta>;
  displayedColumns: string[] = ['date', 'index', 'title', 'creator', 'revType'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private injector: Injector,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const revisionService = this.injector.get(RevisionService);
    revisionService.getRevisions().add(() => {
      this.dataSource =  new MatTableDataSource<RevisionMeta>(revisionService.revisions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  textFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  previewRev(rev) {
    revisionSelected=rev;
    let activeComponent: any;
    switch(revisionSelected.revType) { 
      case "Creation": { 
        activeComponent = CreationDialog; 
        break; 
      } 
      case "Description": { 
        activeComponent = DescriptionDialog; 
        break; 
      } 
      default: { 
         break; 
      } 
   } 
    const dialogRef = this.dialog.open(activeComponent, {
      width: '50%',
      height: '65%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
selector: 'creation-dialog',
templateUrl: './modals/creation.component.html',
styleUrls: ['./modals/creation.component.scss']
})
export class CreationDialog implements OnInit{
  creationRev: CreationMeta;
  creatorEmail: string;
  creatorFullName: string;
  revisionSelected: RevisionMeta;

  constructor(private injector: Injector){}

ngOnInit(){
    this.revisionSelected = revisionSelected;
    const revisionService = this.injector.get(RevisionService);
    revisionService.getCreationRevision(revisionSelected._id).add(() => {
      this.creationRev = revisionService.creationRevision;
      this.creatorEmail = revisionSelected.email;
      this.creatorFullName = revisionSelected.creator;
  });
}

}

@Component({
  selector: 'description-dialog',
  templateUrl: './modals/description.component.html',
  styleUrls: ['./modals/description.component.scss']
  })
  export class DescriptionDialog implements OnInit{
    descriptionRev: DescriptionMeta;
    revisionSelected: RevisionMeta;
    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getDescriptionRevision(revisionSelected._id, revisionSelected.index).add(() => {
        this.descriptionRev = revisionService.descriptionRevision;
    });
  }
  
  }