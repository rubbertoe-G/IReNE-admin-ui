import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { DocumentMeta } from '../models/documents.model';
import { CollaboratorMeta } from './../models/collaborators.model';


const collaborators: CollaboratorMeta[] = [
  {id: 'aq9zI01ORNE9Okyziblp', firstName: 'Roberto', lastName: 'Guzman', email: 'roberto.guzman3@upr.edu', banned: true},
  {id: '66BuIJ0kNTYPDGz405qb', firstName: 'Yomar', lastName: 'Ruiz', email: 'yomar.ruiz@upr.edu', banned: false},
  {id: 'W0SUHONPhPrkrvL3ruxj', firstName: 'Jainel', lastName: 'Torres', email: 'jainel.torrer@upr.edu', banned: false},
  {id: 'zOHEzUyIKZB3LsAiu2Kb', firstName: 'Alberto', lastName: 'Canela', email: 'alberto.canela@upr.edu', banned: false},
  {id: '9XIu1jT96A5qz1Kpl90R', firstName: 'Alejandro', lastName: 'Vasquez', email: 'alejandro.vasquez@upr.edu', banned: false},
  {id: 'jEFgdhchAjyVhJikg17s', firstName: 'Don', lastName: 'Quijote', email: 'don.quijote@upr.edu', banned: true},
];

const dbDocuments: DocumentMeta[] = [
    {id: 'tPbl1DyxToy1FUHpfcqn', creator: 'Roberto Guzman', published: false},
    {id: 'iO0PxjKJY0FwezeVq943', creator: 'Roberto Guzman', published: true},
    {id: 'VwVIAfAK1qjXwIjUepnd', creator: 'Roberto Guzman', published: true},
];
  


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/collaborators') && method === 'GET':
                    return getCollaborators();
                case url.endsWith('/api/collaborators/ban') && method === 'PUT':
                    return banCollaborator();
                case url.endsWith('/api/collaborators/unban') && method === 'PUT':
                    return unbanCollaborator();
                case url.endsWith('/api/documents') && method === 'GET':
                    return getDocuments();
                case url.endsWith('/api/documents/publish') && method === 'PUT':
                        return publishDocument();
                case url.endsWith('/api/documents/unpublish') && method === 'PUT':
                        return unpublishDocument();
                default:
                    return next.handle(request);
            }
        }

        // route functions
        function getCollaborators() {
            return ok(collaborators);
        }

        function banCollaborator() {
            const {collabId} = body;
            for (let index = 0; index < collaborators.length; index++) {
              const element = collaborators[index];
              if (element.id === collabId){
                  element.banned = true;
                return ok(collabId);
              }
            }

            return error('Something went wrong at /api/collaborators');
        }

        function unbanCollaborator() {
          const {id} = body;
          for (let index = 0; index < collaborators.length; index++) {
            const element = collaborators[index];
            if (element.id === id){
                element.banned = false;
              return ok(id);
            }
          }
        }

        // Documents

        function getDocuments() {
            return ok(dbDocuments);
        }

        function publishDocument(){
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
            const {id} = body;
            for (let index = 0; index < dbDocuments.length; index++) {
                const element = dbDocuments[index];
                if (element.id === id) {
                    element.published = false;
                    return ok(id);
                }
              }
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
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