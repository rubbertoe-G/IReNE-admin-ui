import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CollaboratorComponent } from 'src/app/modules/collaborator/collaborator.component';
import { DocumentsComponent } from 'src/app/modules/documents/documents.component';
import { AccessRequestsComponent } from 'src/app/modules/access-requests/access-requests.component';
import { TagsComponent } from 'src/app/modules/tags/tags.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { RevisionsModule } from 'src/app/modules/revisions/revisions.module';


@NgModule({
  declarations: [
    DefaultComponent,
    CollaboratorComponent,
    DocumentsComponent,
    AccessRequestsComponent,
    TagsComponent,
  ],
  imports: [
    RevisionsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSortModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  providers: [
    CollaboratorsService,
    DocumentsService
  ]
})
export class DefaultModule { }
