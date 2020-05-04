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
import { AuthGuard } from './shared/authentication/auth.guard';
import { RevisionsComponent } from './modules/revisions/revisions.component';


const routes: Routes = [
  { path: '', component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'collaborators', pathMatch: 'full' },
      { path: 'collaborators', component: CollaboratorComponent, canActivate: [AuthGuard]},
      { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
      { path: 'access-requests', component: AccessRequestsComponent, canActivate: [AuthGuard] },
      { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
      { path: 'revision-history', component: RevisionsComponent, canActivate: [AuthGuard] },
    ]},

    { 
      path: 'documents/preview/:docId',
      component: PreviewComponent, canActivate: [AuthGuard]
    },

    { 
      path: 'login', 
      component: LoginComponent 
    },

    { 
      path: '**', component: NotfoundComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
