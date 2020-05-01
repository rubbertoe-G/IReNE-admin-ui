import { Component, OnInit, ViewChild, Injector, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RevisionMeta } from 'src/app/shared/models/revision.model';
import { CreationMeta } from 'src/app/shared/models/creation.model';
import { RevisionService } from 'src/app/shared/services/revision.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { DescriptionMeta } from 'src/app/shared/models/description.model';
import { TitleMeta } from 'src/app/shared/models/title.model';
import { TimelineMeta } from 'src/app/shared/models/timeline.model';
import { InfrastructureMeta } from 'src/app/shared/models/infrastructure.model';
import { DamageMeta } from 'src/app/shared/models/damage.model';
import { LocationMeta } from 'src/app/shared/models/location.model';
import { TagMetaDOC } from 'src/app/shared/models/tags.model';
import { IncidentMeta } from 'src/app/shared/models/incident.model';
import { AuthorMetaDOC } from 'src/app/shared/models/author.model';
import { ActorMetaDOC } from 'src/app/shared/models/actor.model';
import { SectionMetaDOC } from 'src/app/shared/models/section.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevisionsDataSource } from 'src/app/shared/services/revisions.datasource';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

var revisionSelected: RevisionMeta;
@Component({
  selector: 'app-documents',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss']
})
export class RevisionsComponent implements OnInit {

  dataSource: RevisionsDataSource;
  displayedColumns: string[] = ['date', 'index', 'title', 'creator', 'revType'];
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private injector: Injector,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const revisionService = this.injector.get(RevisionService);
    this.dataSource =  new RevisionsDataSource(revisionService);
    this.dataSource.loadRevisions('date','', 'desc', 0, 10);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;

                this.loadRevisionsPage();
            })
        )
        .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadRevisionsPage())
    )
    .subscribe();
  }

  loadRevisionsPage() {
      this.dataSource.loadRevisions(
          this.sort.active,
          this.input.nativeElement.value,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
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
      case "Title": { 
        activeComponent = TitleDialog; 
        break; 
      } 
      case "Timeline": { 
        activeComponent = TimelineDialog; 
        break; 
      } 
      case "Infrastructure": { 
        activeComponent = InfrastructureDialog; 
        break; 
      } 
      case "Damage": { 
        activeComponent = DamageDialog; 
        break; 
      }
      case "Location": { 
        activeComponent = LocationDialog; 
        break; 
      } 
      case "Tag": { 
        activeComponent = TagDialog; 
        break; 
      } 
      case "Incident Date": { 
        activeComponent = IncidentDialog; 
        break; 
      }
      case "Author": { 
        activeComponent = AuthorDialog; 
        break; 
      }
      case "Actor": { 
        activeComponent = ActorDialog; 
        break; 
      }
      case "Section": { 
        activeComponent = SectionDialog; 
        break; 
      }
      default: { 
         break; 
      } 
   } 
    const dialogRef = this.dialog.open(activeComponent, {
      width: '70%',
      height: '65%'
    });
  }
}



@Component({
  selector: 'header-component',
  templateUrl: './modals/header.component.html',
  styleUrls: ['./modals/header.component.scss']
  })
  export class HeaderComponent implements OnInit{
    sectionRev: SectionMetaDOC;
    revisionSelected: RevisionMeta;

    
    constructor(){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
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

  @Component({
    selector: 'title-dialog',
    templateUrl: './modals/title.component.html',
    styleUrls: ['./modals/title.component.scss']
    })
    export class TitleDialog implements OnInit{
      titleRev: TitleMeta;
      revisionSelected: RevisionMeta;
  
      constructor(private injector: Injector){}
    
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        
        revisionService.getTitleRevision(revisionSelected._id, revisionSelected.index).add(() => {
          this.titleRev = revisionService.titleRevision;
      });
    }
}


@Component({
  selector: 'timeline-dialog',
  templateUrl: './modals/timeline.component.html',
  styleUrls: ['./modals/timeline.component.scss']
  })
  export class TimelineDialog implements OnInit{
    timelineRev: TimelineMeta;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      
      revisionService.getTimelineRev(revisionSelected._id, revisionSelected.index).add(() => {
        this.timelineRev = revisionService.timelineRevision;
    });
  }
  
}

@Component({
  selector: 'infrastructure-dialog',
  templateUrl: './modals/infrastructure.component.html',
  styleUrls: ['./modals/infrastructure.component.scss']
  })
  export class InfrastructureDialog implements OnInit{
    infrastructureRev: InfrastructureMeta;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getInfrastructureRev(revisionSelected._id, revisionSelected.index).add(() => {
        this.infrastructureRev = revisionService.infrastructureRevision;
    });
  }
  
}

@Component({
  selector: 'damage-dialog',
  templateUrl: './modals/damage.component.html',
  styleUrls: ['./modals/damage.component.scss']
  })
  export class DamageDialog implements OnInit{
    damageRev: DamageMeta;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getDamageRev(revisionSelected._id, revisionSelected.index).add(() => {
        this.damageRev = revisionService.damageRevision;
    });
  }
  
}

@Component({
  selector: 'location-dialog',
  templateUrl: './modals/location.component.html',
  styleUrls: ['./modals/location.component.scss']
  })
  export class LocationDialog implements OnInit{
    locationRev: LocationMeta;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getLocationRevision(revisionSelected._id, revisionSelected.index).add(() => {
        this.locationRev = revisionService.locationRevision;
    });
  }
  
}

@Component({
  selector: 'tag-dialog',
  templateUrl: './modals/tag.component.html',
  styleUrls: ['./modals/tag.component.scss']
  })
  export class TagDialog implements OnInit{
    tagRev: TagMetaDOC;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getTagRevision(revisionSelected._id, revisionSelected.index).add(() => {
        this.tagRev = revisionService.tagRevision;
    });
  }
}


@Component({
  selector: 'incidentDate-dialog',
  templateUrl: './modals/incidentDate.component.html',
  styleUrls: ['./modals/incidentDate.component.scss']
  })
  export class IncidentDialog implements OnInit{
    incidentRev: IncidentMeta;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getIncidentRevision(revisionSelected._id, revisionSelected.index).add(() => {
        this.incidentRev = revisionService.incidentRevision;
    });
  }
}

@Component({
  selector: 'author-dialog',
  templateUrl: './modals/author.component.html',
  styleUrls: ['./modals/author.component.scss']
  })
  export class AuthorDialog implements OnInit{
    authorRev: AuthorMetaDOC;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getAuthorRevision(revisionSelected._id, revisionSelected.index).add(() => {
        this.authorRev = revisionService.authorRevision;
    });
  }
}


@Component({
  selector: 'actor-dialog',
  templateUrl: './modals/actor.component.html',
  styleUrls: ['./modals/actor.component.scss']
  })
  export class ActorDialog implements OnInit{
    actorRev: ActorMetaDOC;
    revisionSelected: RevisionMeta;

    constructor(private injector: Injector){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getActorRevision(revisionSelected._id, revisionSelected.index).add(() => {
        this.actorRev = revisionService.actorRevision;
    });
  }
}

@Component({
  selector: 'section-dialog',
  templateUrl: './modals/section.component.html',
  styleUrls: ['./modals/section.component.scss']
  })
  export class SectionDialog implements OnInit{
    sectionRev: SectionMetaDOC;
    revisionSelected: RevisionMeta;
    oldSectionContent: string;
    newSectionContent: string;
    oldSectionTitle: string;
    newSectionTitle: string;
    constructor(private injector: Injector,
      private sanitizer: DomSanitizer){
      
    }
  
  ngOnInit(){
    this.revisionSelected = revisionSelected;
    const revisionService = this.injector.get(RevisionService);
    revisionService.getSectionRevision(revisionSelected._id, revisionSelected.index).add(() => {
      this.sectionRev = revisionService.sectionRevision;
      this.oldSectionContent = this.sectionRev.old.content;
      this.newSectionContent = this.sectionRev.new.content
      this.oldSectionTitle = this.sectionRev.old.secTitle;
      this.newSectionTitle=  this.sectionRev.new.secTitle;
  });
  }
}