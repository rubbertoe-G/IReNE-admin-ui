import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';




@NgModule({
  declarations: [
    PreviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule
  ]
})
export class PreviewModule { }

