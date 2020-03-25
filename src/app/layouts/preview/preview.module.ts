import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';




@NgModule({
  declarations: [
    PreviewComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule
  ]
})
export class PreviewModule { }

