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


// const dbAdmin: AdminMeta[] = {
// }

const dbCollaborators: CollaboratorMeta[] = [
  {id: 'aq9zI01ORNE9Okyziblp', firstName: 'Roberto', lastName: 'Guzman', email: 'roberto.guzman3@upr.edu', banned: true},
  {id: '66BuIJ0kNTYPDGz405qb', firstName: 'Yomar', lastName: 'Ruiz', email: 'yomar.ruiz@upr.edu', banned: false},
  {id: 'W0SUHONPhPrkrvL3ruxj', firstName: 'Jainel', lastName: 'Torres', email: 'jainel.torrer@upr.edu', banned: false},
  {id: 'zOHEzUyIKZB3LsAiu2Kb', firstName: 'Alberto', lastName: 'Canela', email: 'alberto.canela@upr.edu', banned: false},
  {id: '9XIu1jT96A5qz1Kpl90R', firstName: 'Alejandro', lastName: 'Vasquez', email: 'alejandro.vasquez@upr.edu', banned: false},
  {id: 'jEFgdhchAjyVhJikg17s', firstName: 'Don', lastName: 'Quijote', email: 'don.quijote@upr.edu', banned: true},
];

const dbDocuments: DocumentMeta[] = [
    {id: 'tPbl1DyxToy1FUHpfcqn', creator: 'Roberto Guzman', published: false},
    {id: 'iO0PxjKJY0FwezeVq943', creator: 'Yomar Ruiz', published: true},
    {id: 'qkdQoXSmnNeMISTmMP4f', creator: 'Alberto Canela', published: false},
    {id: 'RYTSBZAiwlAG0t8EOb6B', creator: 'Alejandro Vasquez', published: true},
    {id: 'VzunBYihBS05mpj0U9pP', creator: 'Don Quijote', published: true},
];

const tags: TagMeta[] = [
    {tagNbr: 1, name: 'Electric'},
    {tagNbr: 2, name: 'Chaldish Gambino'},
    {tagNbr: 3, name: 'Miss Keesha'},
    {tagNbr: 4, name: 'Don Quijote'},
    {tagNbr: 5, name: 'Volatile'},
  ];

const requests: RequestMeta[] = [
    {requestNbr: 1, name: 'Sancho Panza'},
    {requestNbr: 2, name: 'Dulcinea del Toboso'},
    {requestNbr: 3, name: 'Rocinante'},
    {requestNbr: 4, name: 'Don Quijote de la Mancha'},
    {requestNbr: 5, name: 'Roberto Guzman'},
    {requestNbr: 6, name: 'Yomar Ruiz'},
    {requestNbr: 7, name: 'Jainel Torres'},
    {requestNbr: 8, name: 'Alberto Canela'},
    {requestNbr: 9, name: 'Alejandro Vasquez'},
  ];
  
const users: AdminMeta[] = [
    {username : "admin", password : "password"}
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
                case url.endsWith('/admin/collaborators') && method === 'GET':
                    return getCollaborators();
                case url.endsWith('/admin/collaborators/ban') && method === 'PUT':
                    return banCollaborator();
                case url.endsWith('/admin/collaborators/unban') && method === 'PUT':
                    return unbanCollaborator();
                case url.endsWith('admin/collaborators/remove') && method === 'PUT':
                        return removeCollaborator();
                case url.endsWith('/admin/documents') && method === 'GET':
                    return getDocuments();
                case url.endsWith('/admin/documents/publish') && method === 'PUT':
                        return publishDocument();
                case url.endsWith('/admin/documents/unpublish') && method === 'PUT':
                        return unpublishDocument();
                case url.endsWith('/admin/view') && method === 'GET':
                    return viewDocument();
                case url.endsWith('/admin/tags') && method === 'GET':
                    return getTags();
                case url.endsWith('/admin/tags/remove') && method === 'PUT':
                    return removeTag();
                case url.endsWith('/admin/access-requests') && method === 'GET':
                    return getRequests();
                case url.endsWith('/admin/access-requests/accept') && method === 'PUT':
                    return acceptRequest();
                case url.endsWith('/admin/access-requests/deny') && method === 'PUT':
                    return denyRequest();
                    case url.endsWith('/admin/login') && method === 'POST':
                        return login();
                default:
                    return next.handle(request);
            }
        }

        function login() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user)
            {
                throw new HttpErrorResponse({
                    statusText: 'Username or password is incorrect.',
                    status: 401
                });
            } 
            user.token = jwtToken;
            return ok(user);
        }
        
        function getRequests() {
            if (!isLoggedIn()) 
                unauthorized();
            return ok(requests);
        }

        function acceptRequest() {
            if (!isLoggedIn()) 
                unauthorized();
            const {requestID} = body;
            for (let index = 0; index < requests.length; index++) {
              const element = requests[index];
              if (element.requestNbr.toString() === requestID){
                  return of(new HttpResponse({
                    statusText: 'Successful deletion.',
                    status: 200
                }));
              }
            }
            throw new HttpErrorResponse({
                statusText: 'Something went wrong at /admin/access-requests/accept',
                status: 500
            });
        }

        function denyRequest() {
            if (!isLoggedIn()) 
                unauthorized();
            const {requestID} = body;
            for (let index = 0; index < requests.length; index++) {
              const element = requests[index];
              if (element.requestNbr.toString() === requestID){
                  return ok(requestID);
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
            return ok(tags);
        }

        function removeTag(){
            if (!isLoggedIn()) 
                unauthorized();
            const {tagID} = body;
            for (let index = 0; index < tags.length; index++) {
              const element = tags[index];
              if (element.tagNbr.toString() === tagID){
                  return ok(tagID);
              }
            }
            throw new HttpErrorResponse({
                statusText: 'Something went wrong at /api/collaborators',
                status: 500
            });
        }

        // Collaborators
        function getCollaborators() {
            if (!isLoggedIn()) 
                unauthorized();
            return ok(dbCollaborators);
        }

        function banCollaborator() {
            if (!isLoggedIn()) 
                unauthorized();
            const {collabId} = body;
            for (let index = 0; index < dbCollaborators.length; index++) {
              const element = dbCollaborators[index];
              if (element.id === collabId){
                  element.banned = true;
                return ok(collabId);
              }
            }

            return error('Something went wrong at /api/collaborators');
        }

        function unbanCollaborator() {
            if (!isLoggedIn()) 
                unauthorized();
            const {id} = body;
            for (let index = 0; index < dbCollaborators.length; index++) {
                const element = dbCollaborators[index];
                if (element.id === id){
                    element.banned = false;
                return ok(id);
                }
            }
        }

        function removeCollaborator() {
            if (!isLoggedIn()) 
                unauthorized();
            const { id } = body;
            let removeIndex = -1;
            for (let index = 0; index < dbCollaborators.length; index++) {
                const element = dbCollaborators[index];
                if (element.id === id){
                   removeIndex = index;
                }
            }
            if(removeIndex >= 0){
                dbCollaborators.splice(removeIndex, 1);
                return ok(id);
            }

            
        }

        // Documents

        function getDocuments() {
            if (!isLoggedIn()) 
                unauthorized();
            return ok(dbDocuments);
        }

        function publishDocument(){
            if (!isLoggedIn()) 
                unauthorized();
            const {id} = body;
            for (let index = 0; index < dbDocuments.length; index++) {
                const element = dbDocuments[index];
                if (element.id === id) {
                    element.published = true;
                    return ok(id);
                }
              }
        }

        function unpublishDocument(){
            if (!isLoggedIn()) 
                unauthorized();
            const {id} = body;
            for (let index = 0; index < dbDocuments.length; index++) {
                const element = dbDocuments[index];
                if (element.id === id) {
                    element.published = false;
                    return ok(id);
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

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === "Bearer "+jwtToken;
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