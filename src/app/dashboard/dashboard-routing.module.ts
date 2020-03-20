import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMainComponent } from './dashboardmain/dashboardmain.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { DocumentsComponent } from './documents/documents.component';
import { TagsComponent } from './tags/tags.component';
import { AccessRequestsComponent } from './access-requests/access-requests.component';



const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardMainComponent,
    children: [
      { path: 'collaborators', component: CollaboratorsComponent},
      { path: 'documents', component: DocumentsComponent},
      { path: 'tags', component: TagsComponent},
      { path: 'access-requests', component: AccessRequestsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
