import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { base64PDF } from './samplePdf';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  base64Src = base64PDF;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params['docId'])
    });
  }

}
