import { CollaboratorComponent } from './modules/collaborator/collaborator.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { TagsComponent } from './modules/tags/tags.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './modules/documents/documents.component';
import { AccessRequestsComponent } from './modules/access-requests/access-requests.component';
import { LoginComponent } from './layouts/login/login.component';


const routes: Routes = [
  { path: '', component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'collaborators', component: CollaboratorComponent},
      { path: 'documents', component: DocumentsComponent },
      { path: 'access-requests', component: AccessRequestsComponent },
      { path: 'tags', component: TagsComponent }
    ]},
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotfoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
