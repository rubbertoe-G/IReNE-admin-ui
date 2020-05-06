import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {environment} from 'src/environments/environment';


interface Author {
  author_FN: string;
  author_LN: string;
  author_email: string;
  author_faculty: string;
}

interface Actor {
  actor_FN: string;
  actor_LN: string;
  role: string;
}

interface Section {
  secTitle: string;
  content: string;
}

interface Document {
  title: string;
  description: string;
  creatorFullName: string;
  creatorEmail: string;
  creationDate: string;
  lastModificationDate: string;
  incidentDate: string;
  infrasDocList: Array<string>;
  damageDocList: Array<string>;
  tagsDoc: Array<string>;
  author: Array<Author>;
  actor: Array<Actor>;
  section: Array<Section>;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PreviewComponent implements OnInit {
  loadingDocument = true;
  notFound = false;
  title = '';
  description = '';
  creatorFullName = '';
  creatorEmail = '';
  creationDate = '';
  lastModificationDate = '';
  incidentDate = '';
  infrasDocList: Array<string> = [];
  damageDocList: Array<string> = [];
  tagsDoc: Array<string> = [];
  author: Array<Author> = [];
  actor: Array<Actor> = [];
  section: Array<Section> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {

  }

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
