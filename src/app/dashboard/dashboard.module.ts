
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccessRequestsComponent } from './access-requests/access-requests.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { DocumentsComponent } from './documents/documents.component';
import { TagsComponent } from './tags/tags.component';
import { DashboardMainComponent } from './dashboardmain/dashboardmain.component';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    DashboardMainComponent,
    AccessRequestsComponent,
    CollaboratorsComponent,
    DocumentsComponent,
    TagsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,

    // Always call routing modules at the end
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
