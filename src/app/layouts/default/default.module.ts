import { RouterModule } from '@angular/router';
import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { CollaboratorComponent } from 'src/app/modules/collaborator/collaborator.component';
import { DocumentsComponent } from 'src/app/modules/documents/documents.component';
import { AccessRequestsComponent } from 'src/app/modules/access-requests/access-requests.component';
import { TagsComponent } from 'src/app/modules/tags/tags.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CollaboratorComponent,
    DocumentsComponent,
    AccessRequestsComponent,
    TagsComponent
  ],
  imports: [
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

    FlexLayoutModule,
  ],
  providers: [
    DashboardService,
    CollaboratorsService,
    DocumentsService
  ]
})
export class DefaultModule { }
