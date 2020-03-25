import { CollaboratorComponent } from './modules/collaborator/collaborator.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { TagsComponent } from './modules/tags/tags.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './modules/documents/documents.component';
import { AccessRequestsComponent } from './modules/access-requests/access-requests.component';
import { LoginComponent } from './layouts/login/login.component';
import { PreviewComponent } from './layouts/preview/preview.component';


const routes: Routes = [
  { path: '', component: DefaultComponent,
    children: [
      { path: '', redirectTo: '/collaborators', pathMatch: 'full' },
      { path: 'collaborators', component: CollaboratorComponent},
      { path: 'documents', component: DocumentsComponent },
      { path: 'access-requests', component: AccessRequestsComponent },
      { path: 'tags', component: TagsComponent }
    ]},
    {path: 'preview/:docId', component: PreviewComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotfoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
