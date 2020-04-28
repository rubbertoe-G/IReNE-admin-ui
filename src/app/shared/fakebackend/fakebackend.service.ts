import { base64PDF } from './fake-data/samplePdf';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { DocumentMeta } from '../models/documents.model';
import { CollaboratorMeta } from './../models/collaborators.model';
import { TagMeta } from './../models/tags.model';
import { RequestMeta } from './../models/access-requests.model';
import { AdminMeta } from './../models/admin.model';
import {fakeCollaborators} from './fake-data/fake-collaborators';
import { fakeDocuments } from './fake-data/fake-documents';
import { fakeHist } from './fake-data/fake-revisions';
import { RevisionMeta } from '../models/revision.model';
import { element } from 'protractor';


const dbCollaborators = fakeCollaborators;

const dbDocuments: DocumentMeta[] = fakeDocuments;


var tags: TagMeta[] = [
    {_id: 'ak9zI01ORNE9Okyziblp', tagItem: 'Electric'},
    {_id: '67BuIJ1kNTYPDGz405qb', tagItem: 'Chaldish Gambino'},
    {_id: 'L1TUHONPhPrkrvL3ruxj', tagItem: 'Miss Keesha'},
    {_id: 'yOHEzUyQKZB3LsAiu2Kb', tagItem: 'Don Quijote'},
    {_id: 'uIXgdhchAjyVhJikg17s', tagItem: 'Volatile'},
  ];

  
const users: AdminMeta[] = [
    {username : "yomar.ruiz", password:"Password0"},
    {username : "admin0", password:"Password1"}
    ];

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.Xs1l2H7ui_yqE-GlQ2GARQ5ZpjuS8B8xQaooy89Q8y8";
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body, params } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/admin/collaborators/') && method === 'GET':
                    return getCollaborators();
                case url.endsWith('/admin/collaborators/ban') && method === 'PUT':
                    return banCollaborator();
                case url.endsWith('/admin/collaborators/unban') && method === 'PUT':
                    return unbanCollaborator();
                case url.endsWith('admin/collaborators/remove') && method === 'PUT':
                        return removeCollaborator();
                case url.endsWith('/admin/documents/') && method === 'GET':
                    return getDocuments();
                case url.endsWith('/admin/documents/publish') && method === 'PUT':
                        return publishDocument();
                case url.endsWith('/admin/documents/unpublish') && method === 'PUT':
                        return unpublishDocument();
                case url.endsWith('/admin/view') && method === 'GET':
                    return viewDocument();
                case url.endsWith('/admin/tags/') && method === 'GET':
                    return getTags();
                case url.endsWith('/admin/tags/remove') && method === 'PUT':
                    return removeTag();
                case url.endsWith('/admin/access-requests/') && method === 'GET':
                    return getRequests();
                case url.endsWith('/admin/access-requests/approve') && method === 'PUT':
                    return acceptRequest();
                case url.endsWith('/admin/access-requests/deny') && method === 'PUT':
                    return denyRequest();
                case url.endsWith('/admin/auth/login') && method === 'POST':
                    return login();
                case url.endsWith('/admin/documents-hist/') && method === 'GET':
                    return getAllHist();
                case url.endsWith('/admin/documents-hist/revision') && method === 'POST':
                    return getRevision();
                default:
                    return next.handle(request);
            }
        }

        function login() {
            const username = body.get('username');
            const password = body.get('password');
            const user = users.find(x => x.username === username.toLowerCase() && x.password === password);
            if (!user)
            {
                throw new HttpErrorResponse({
                    statusText: 'Username or password is incorrect.',
                    status: 401
                });
            } 
            user.token = jwtToken;
            return of(new HttpResponse({
                body: {'access_token': user.token},
                statusText: 'Successful login.',
                status: 200
            }));;
        }
        
        function getRequests() {
            if (!isLoggedIn()) 
                unauthorized();
            const responseValues: RequestMeta[] = [];
        
            dbCollaborators.forEach(c => {
                if(!c.approved){
                    responseValues.push(c)
                }
                    
            });
            return of(new HttpResponse({
                body: {'requests': responseValues},
                status: 200
            }));
        }

        function getAllHist(){
            if (!isLoggedIn()) 
                unauthorized();
            var responseValues: RevisionMeta[] = [];
            fakeHist.forEach(c => {
                let data: RevisionMeta = {
                    _id: '',
                    date: '',
                    title: '',
                    creator: '',
                    revType: '',
                    index: 0,
                    email: '',}
                data._id=c._id;
                var creator = dbCollaborators.find(element=> element._id==c.creatorId)
                data.creator = creator.first_name + " " + creator.last_name;
                data.email = creator.email;
                for(let i = 0; i < c.revisions.length; i++){
                        data.date=c.revisions[i].revDate;
                        data.index = i;
                        data.revType = c.revisions[i].revType;
                        var doc = dbDocuments.find(element=> element._id==c.docId)
                        data.title = doc.title;
                        var clonedObj = { ...data }
                        responseValues.push(clonedObj);
                }
                });
            console.log(responseValues)
            return of(new HttpResponse({
                body: {'revision-history': responseValues},
                status: 200
            }));
        }

        function getRevision(){
            if (!isLoggedIn()) 
                unauthorized();
            const index = body.get('index');
            const revDocId = body.get('revDocId');
            var revDoc = fakeHist.find(element => element._id == revDocId);
            var revision = revDoc.revisions[index];
            return of(new HttpResponse({
                body: {'revision': revision.fields},
                status: 200
            }));
        }

        function acceptRequest() {
            if (!isLoggedIn()) 
                unauthorized();
            const requestID = body.get('collabID');
            for (let index = 0; index < dbCollaborators.length; index++) {
              const element = dbCollaborators[index];
              if (!element.approved && element._id.toString() === requestID){
                  element.approved = true;
                  return of(new HttpResponse({
                    body: {'access_request': requestID},
                    statusText: 'Successful acceptance.',
                    status: 200
                }));
              }
            }
            throw new HttpErrorResponse({
                statusText: 'Something went wrong at /admin/access-requests/approve',
                status: 500
            });
        }

        function denyRequest() {
            if (!isLoggedIn()) 
                unauthorized();
            const requestID = body.get('collabID');
            for (let index = 0; index < dbCollaborators.length; index++) {
              const element = dbCollaborators[index];
              if (!element.approved && element._id.toString() === requestID){
                    dbCollaborators.splice(index, 1);
                    return of(new HttpResponse({
                        body: {'access_request': requestID},
                        statusText: 'Successful denial.',
                        status: 200
                    }));
              }
            }
            throw new HttpErrorResponse({
                statusText: 'Something went wrong at /admin/access-requests/deny',
                status: 500
            });
        }

        function getTags() {
            if (!isLoggedIn()) 
                unauthorized();
            return of(new HttpResponse({
                body: {'tags': tags},
                status: 200
            }));
        }

        function removeTag(){
            if (!isLoggedIn()) 
                unauthorized();
            const tagID = body.get('tagID');
            for (let index = 0; index < tags.length; index++) {
              const element = tags[index];
              if (element._id.toString() === tagID){
                tags = tags.filter(e => e._id.toString() !== tagID);
                return of(new HttpResponse({
                    body: {'tag': tagID},
                    status: 200
                }));
              }
            }
            throw new HttpErrorResponse({
                statusText: 'Something went wrong at /api/tags',
                status: 500
            });
        }

        // Collaborators
        function getCollaborators() {
            if (!isLoggedIn()) {
                unauthorized();
            }
            
            const responseValues: CollaboratorMeta[] = [];
            
            dbCollaborators.forEach(c => {
                if(c.approved){
                    responseValues.push(c)
                }
                    
            });
            
            
            return of(new HttpResponse({
                body: {'collaborators': responseValues},
                status: 200
            }));
        }

        /**
         * Somulate the banning of a collaborator
         */
        function banCollaborator() {
            if (!isLoggedIn()) 
                unauthorized();       
            const id = body.get('collabID');
            for (let index = 0; index < dbCollaborators.length; index++) {
              const collaborator = dbCollaborators[index];
              if (collaborator._id === id){
                collaborator.banned = true;
                for (let index = 0; index < dbDocuments.length; index++) {
                    const element = dbDocuments[index];
                    if (element.creator === collaborator.first_name + ' ' + collaborator.last_name) {
                        element.published = false;
                    }
                }
                return of(new HttpResponse({
                    body: {'collaborator': id},
                    status: 200
                }));
              }
            }
            throw new HttpErrorResponse({
                statusText: 'Something went wrong at /api/collaborators',
                status: 500
            });
        }

        /**
         * Simulate the unbaning of a collaborator
         */
        function unbanCollaborator() {
            if (!isLoggedIn()) 
                unauthorized();
            const id = body.get('collabID');
            for (let index = 0; index < dbCollaborators.length; index++) {
                const collaborator = dbCollaborators[index];
                if (collaborator._id === id){
                    collaborator.banned = false;
                    for (let index = 0; index < dbDocuments.length; index++) {
                        const element = dbDocuments[index];
                        if (element.creator === collaborator.first_name + ' ' + collaborator.last_name) {
                            element.published = true;
                        }
                    }
                    return of(new HttpResponse({
                        body: {'collaborator': id},
                        status: 200
                    }));
                }
            }
        }

        function removeCollaborator() {
            if (!isLoggedIn()) 
                unauthorized();
            const id = body.get('collabID');
            let removeIndex = -1;
            for (let index = 0; index < dbCollaborators.length; index++) {
                const element = dbCollaborators[index];
                if (element._id === id){
                   removeIndex = index;
                }
            }
            if(removeIndex >= 0){
                dbCollaborators.splice(removeIndex, 1);
                return of(new HttpResponse({
                    body: {'collaborator': id},
                    status: 200
                }));
            }

            
        }

        // Documents

        function getDocuments() {
            if (!isLoggedIn()) 
                unauthorized();
                return of(new HttpResponse({
                    body: {'documents': dbDocuments},
                    status: 200
                }));
        }

        function publishDocument(){
            if (!isLoggedIn()) 
                unauthorized();
            const id = body.get('docID');
            for (let index = 0; index < dbDocuments.length; index++) {
                const element = dbDocuments[index];
                if (element._id === id) {
                    element.published = true;
                    return of(new HttpResponse({
                        body: {'document': id},
                        status: 200
                    }));
                }
              }
        }

        function unpublishDocument(){
            if (!isLoggedIn()) 
                unauthorized();
            const id = body.get('docID');
            for (let index = 0; index < dbDocuments.length; index++) {
                const element = dbDocuments[index];
                if (element._id === id) {
                    element.published = false;
                    return of(new HttpResponse({
                        body: {'document': id},
                        status: 200
                    }));
                }
              }
        }

        function viewDocument(){
            if (!isLoggedIn()) 
                unauthorized();
            return ok(base64PDF);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            throw new HttpErrorResponse({
                statusText: 'Forbidden.',
                status: 403
            });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === "Bearer "+ jwtToken;
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};