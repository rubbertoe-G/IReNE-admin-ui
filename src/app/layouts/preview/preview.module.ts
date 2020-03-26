import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [
    PreviewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    NgxExtendedPdfViewerModule
  ]
})
export class PreviewModule { }

