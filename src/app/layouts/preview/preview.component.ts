import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';
import { AuthorMeta } from 'src/app/shared/models/author.model';
import { ActorMeta } from 'src/app/shared/models/actor.model';
import { SectionMeta } from 'src/app/shared/models/section.model';
import { Document } from 'src/app/shared/models/documents.model';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';


/**
 * Component that manages the display of the document to preview.
*/
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewComponent implements OnInit {
    /**
   * Variable that determines if the document is loading or not.
   */
  loadingDocument = true;

      /**
   * Variable that determines if the document was found or not.
   */
  notFound = false;

    /**
   * Variable that holds the document title to be displayed.
   */
  title = '';

  /**
   * Variable that holds the document description to be displayed.
   */
  description = '';

    /**
   * Variable that holds the document creator full name to be displayed.
   */
  creatorFullName = '';

    /**
   * Variable that holds the document creator email to be displayed.
   */
  creatorEmail = '';

    /**
   * Variable that holds the document creation date to be displayed.
   */
  creationDate = '';

    /**
   * Variable that holds the document last modification date to be displayed.
   */
  lastModificationDate = '';

    /**
   * Variable that holds the document incident date to be displayed.
   */
  incidentDate = '';

    /**
   * Variable that holds the document infrastructures types to be displayed.
   */
  infrasDocList: Array<string> = [];

    /**
   * Variable that holds the document damages types to be displayed.
   */
  damageDocList: Array<string> = [];

      /**
   * Variable that holds the document's tags to be displayed.
   */
  tagsDoc: Array<string> = [];

    /**
   * Variable that holds the document authors to be displayed.
   */
  author: Array<AuthorMeta> = [];

      /**
   * Variable that holds the document actors to be displayed.
   */
  actor: Array<ActorMeta> = [];

  /**
   * Variable that holds the document section to be displayed.
   */
  section: Array<SectionMeta> = [];

  ckeditorData: SafeHtml = '';

    /**
   * Construct the Access Request component with an Access Request service and a Material Snackbar.
   * 
   * @param {ActivatedRoute} activatedRoute object to get the activated route in the system
   * @param {Router} router router object to allow for easy navigation
   * @param {HttpClient} http http object to send requests
   * @param {DatePipe} datePipe datepipe in order to transform the dates sent by the server
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {

  }

    /**
   * Initialization function to get the document to be preview and displayed to the user.
   * This function doesn't uses a service in order to acquire the document, it bypasses de services
   * and asks directly to the server for the document itself.
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params[`docId`];
      this.http.get(`${environment.backend}/documents/view/` + id).subscribe(
        (response: any) => {
          const doc: Document = response[`document`];
          this.title = doc.title;
          doc.description ? this.description = doc.description : this.description = '';
          this.creatorFullName = doc.creatorFullName;
          this.creatorEmail = doc.creatorEmail;
          this.creationDate = this.datePipe.transform(doc.creationDate, 'yyyy-MM-dd');
          this.lastModificationDate = this.datePipe.transform(doc.lastModificationDate, 'yyyy-MM-dd');
          this.incidentDate = this.datePipe.transform(doc.incidentDate, 'yyyy-MM-dd');
          this.infrasDocList = doc.infrasDocList;
          this.damageDocList = doc.damageDocList;
          this.tagsDoc = doc.tagsDoc;
          this.author = doc.author;
          this.actor = doc.actor;
          this.section = doc.section;
          this.loadingDocument = false;

        },
        (error) => {
          this.loadingDocument = false;
          this.notFound = true;
        }
      );
    });
  }
}
