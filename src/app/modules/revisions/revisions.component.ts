import { Component, OnInit, ViewChild, Injector, ElementRef } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { RevisionsDataSource } from 'src/app/shared/services/revisions.datasource';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

/**
 * Variable that holds the current revision to view selected by the user.
*/
var revisionSelected: RevisionMeta;

/**
 * Component that manages the display of revisions documents.
*/
@Component({
  selector: 'app-documents',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss']
})
export class RevisionsComponent implements OnInit {

  /**
 * Variables that manages the datasource of the revisions documents to be displayed.
*/
  dataSource: RevisionsDataSource;

  /**
  * Variables that holds the columns to be displayed.
  */
  displayedColumns: string[] = ['revision_date', 'revision_number', 'document_title', 'creator_name', 'revision_type'];
     
  /**
   * Variables that holds the filter value to be used.
  */
  @ViewChild('input') input: ElementRef;

  /**
   * Variables that holds the sort object to be used.
  */
  @ViewChild(MatSort, {static: true}) sort: MatSort;

    /**
   * Variables that holds the paginator object to be used.
  */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

      /**
   * Constructor to initialize all the variables to be used.
   * @param {Injector} injector Injector object to be used in the component
   * @param {MatDialog} dialog Dialog object to be used in order to show the revision changes
  */
  constructor(
    private injector: Injector,
    public dialog: MatDialog
  ) { }

    /**
   * Function that initializes the component datasource with the service.
  */
  ngOnInit(): void {
    const revisionService = this.injector.get(RevisionService);
    this.dataSource =  new RevisionsDataSource(revisionService);
    this.dataSource.loadRevisions('revision_date','', 'desc', 0, 8);

  }

  /**
   * Function that performs the filter in the datasource.
  */
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

    /**
   * Load the revisions pages rom the datasource giving the parameters.
  */
  loadRevisionsPage() {
      this.dataSource.loadRevisions(
          this.sort.active,
          this.input.nativeElement.value,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);

  }

      /**
   * Selects the preview component to be used based on the revision type choosen to be displayed.
  */
  previewRev(rev) {
    revisionSelected=rev;
    let activeComponent: any;
    switch(revisionSelected.revision_type) { 
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
      case "Deletion": { 
        activeComponent = DeletionDialog; 
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
  styleUrls: ['./modals/modals.component.scss']
  })
  export class HeaderComponent implements OnInit{
    revisionSelected: RevisionMeta;

    constructor(){}
  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
  }
}

/**
 * Component that is used to display the header part of every modal to be displayed.
*/
@Component({
selector: 'creation-dialog',
templateUrl: './modals/creation.component.html',
styleUrls: ['./modals/modals.component.scss']
})
export class CreationDialog implements OnInit{

  /**
   * Variable that hold the values to be shown in the display.
  */
  creationRev: CreationMeta;
  /**
   * Variable that hold the email to be shown in the display.
  */
  creatorEmail: string;

  /**
   * Variable that hold the full name to be shown in the display.
  */
  creatorFullName: string;

  /**
   * Variable that hold the revision selected metadata to be shown in the display.
  */
  revisionSelected: RevisionMeta;
  
  /**
   * Variable that hold the values to be shown in the display.
   * @param {Injector} injector injector to be used to get the revision
  */
  constructor(private injector: Injector){}
  
  /**
   * Initializes the module to be displayed.
   */
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getCreationRevision(revisionSelected._id).add(() => {
        this.creationRev = revisionService.creationRevision;
        this.creatorEmail = revisionSelected.creator_email;
        this.creatorFullName = revisionSelected.creator_name
    });
  }

}

/**
 * Component that is used to display the modal of the deletion revision type.
*/
@Component({
  selector: 'deletion-dialog',
  templateUrl: './modals/deletion.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class DeletionDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the display.
    */
    creationRev: CreationMeta;
    /**
     * Variable that hold the email to be shown in the display.
    */
    creatorEmail: string;
    /**
     * Variable that hold the full name to be shown in the display.
    */
    creatorFullName: string;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;
    
    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
    /**
   * Initializes the module to be displayed.
   */
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getDeletionRevision(revisionSelected._id).add(() => {
        this.creationRev = revisionService.creationRevision;
        this.creatorEmail = revisionSelected.creator_email;
        this.creatorFullName = revisionSelected.creator_name
    });
  }
  
  }


/**
 * Component that is used to display the modal of the description revision type.
*/
@Component({
  selector: 'description-dialog',
  templateUrl: './modals/description.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class DescriptionDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    descriptionRev: DescriptionMeta;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        
        revisionService.getDescriptionRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.descriptionRev = revisionService.descriptionRevision;
      });
    }
  
  }


/**
 * Component that is used to display the modal of the title revision type.
*/
  @Component({
    selector: 'title-dialog',
    templateUrl: './modals/title.component.html',
    styleUrls: ['./modals/modals.component.scss']
    })
    export class TitleDialog implements OnInit{
      /**
       * Variable that hold the values to be shown in the modal display.
      */
      titleRev: TitleMeta;

      /**
       * Variable that hold the revision selected metadata to be shown in the display.
      */
      revisionSelected: RevisionMeta;
  
      /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
      constructor(private injector: Injector){}
    
    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        
        revisionService.getTitleRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.titleRev = revisionService.titleRevision;
      });
    }
}

/**
 * Component that is used to display the modal of the timeline revision type.
*/
@Component({
  selector: 'timeline-dialog',
  templateUrl: './modals/timeline.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class TimelineDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    timelineRev: TimelineMeta;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
  /**
   * Initializes the module to be displayed.
   */
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      
      revisionService.getTimelineRev(revisionSelected._id, revisionSelected.revision_number).add(() => {
        this.timelineRev = revisionService.timelineRevision;
    });
  }
  
}


/**
 * Component that is used to display the modal of the infrastructure revision type.
*/
@Component({
  selector: 'infrastructure-dialog',
  templateUrl: './modals/infrastructure.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class InfrastructureDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    infrastructureRev: InfrastructureMeta;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
 
  /**
   * Initializes the module to be displayed.
   */ 
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getInfrastructureRev(revisionSelected._id, revisionSelected.revision_number).add(() => {
        this.infrastructureRev = revisionService.infrastructureRevision;
    });
  }
  
}


/**
 * Component that is used to display the modal of the damage revision type.
*/
@Component({
  selector: 'damage-dialog',
  templateUrl: './modals/damage.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class DamageDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    damageRev: DamageMeta;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
  /**
   * Initializes the module to be displayed.
   */  
  ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getDamageRev(revisionSelected._id, revisionSelected.revision_number).add(() => {
        this.damageRev = revisionService.damageRevision;
    });
  }
  
}

/**
 * Component that is used to display the modal of the location revision type.
*/
@Component({
  selector: 'location-dialog',
  templateUrl: './modals/location.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class LocationDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    locationRev: LocationMeta;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
    
    /**
     * Initializes the module to be displayed.
     */  
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        revisionService.getLocationRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.locationRev = revisionService.locationRevision;
      });
    }
  
}

/**
 * Component that is used to display the modal of the tag revision type.
*/
@Component({
  selector: 'tag-dialog',
  templateUrl: './modals/tag.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class TagDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    tagRev: TagMetaDOC;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}

    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        revisionService.getTagRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.tagRev = revisionService.tagRevision;
      });
    }
}

/**
 * Component that is used to display the modal of the incident date revision type.
*/
@Component({
  selector: 'incidentDate-dialog',
  templateUrl: './modals/incidentDate.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class IncidentDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    incidentRev: IncidentMeta;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        revisionService.getIncidentRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.incidentRev = revisionService.incidentRevision;
      });
    }
}


/**
 * Component that is used to display the modal of the author revision type.
*/
@Component({
  selector: 'author-dialog',
  templateUrl: './modals/author.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class AuthorDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    authorRev: AuthorMetaDOC;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        revisionService.getAuthorRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.authorRev = revisionService.authorRevision;
      });
    }
}

/**
 * Component that is used to display the modal of the actor revision type.
*/
@Component({
  selector: 'actor-dialog',
  templateUrl: './modals/actor.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class ActorDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    actorRev: ActorMetaDOC;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
    */
    constructor(private injector: Injector){}
  
    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
        this.revisionSelected = revisionSelected;
        const revisionService = this.injector.get(RevisionService);
        revisionService.getActorRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
          this.actorRev = revisionService.actorRevision;
      });
    }
}

  /**
 * Component that is used to display the modal of the section revision type.
*/
@Component({
  selector: 'section-dialog',
  templateUrl: './modals/section.component.html',
  styleUrls: ['./modals/modals.component.scss']
  })
  export class SectionDialog implements OnInit{
    /**
     * Variable that hold the values to be shown in the modal display.
    */
    sectionRev: SectionMetaDOC;

    /**
     * Variable that hold the revision selected metadata to be shown in the display.
    */
    revisionSelected: RevisionMeta;

    /**
     * Variable that hold the old section content to be shown in the display.
    */
    oldSectionContent: string;

    /**
     * Variable that hold the new section content to be shown in the display.
    */
    newSectionContent: string;

    /**
     * Variable that hold the old section title to be shown in the display.
    */
    oldSectionTitle: string;

    /**
     * Variable that hold the new title content to be shown in the display.
    */
    newSectionTitle: string;

    /**
     * Construction that initializes the injector to be used to get the desired revision.
     * @param {Injector} injector injector to be used to get the revision
     * @param {DomSanitizer} sanitizer sanitizer to be used to sanitize the html server code
    */
    constructor(private injector: Injector,
      private sanitizer: DomSanitizer){
      
    }
  
    /**
     * Initializes the module to be displayed.
     */
    ngOnInit(){
      this.revisionSelected = revisionSelected;
      const revisionService = this.injector.get(RevisionService);
      revisionService.getSectionRevision(revisionSelected._id, revisionSelected.revision_number).add(() => {
        this.sectionRev = revisionService.sectionRevision;
        this.oldSectionContent = this.sectionRev.old.content;
        this.newSectionContent = this.sectionRev.new.content
        this.oldSectionTitle = this.sectionRev.old.secTitle;
        this.newSectionTitle=  this.sectionRev.new.secTitle;
    });
    }
}