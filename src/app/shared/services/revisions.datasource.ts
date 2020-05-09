import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { RevisionMeta } from '../models/revision.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RevisionService } from './revision.service';
import { catchError, finalize } from 'rxjs/operators';

/**
 * Class that acts as a datasource for the revision history.
 */
export class RevisionsDataSource implements DataSource<RevisionMeta> {

    /**
    * Variable that holds all the revision returned from the server as a behavior object.
    */
    private revisionsSubject = new BehaviorSubject<RevisionMeta[]>([]);
    
    /**
    * Variable that holds if the revisions are loading as a behavior object.
    */
    public loadingSubject = new BehaviorSubject<boolean>(false);

    /**
    * Variable that holds the quantity of revisions as a behavior object.
    */
    public quantitySubject  = new BehaviorSubject<number>(0);

    /**
    * Variable that holds if the revisions are loading as an observable object.
    */
    public loading$ = this.loadingSubject.asObservable();

    /**
    * Variable that holds the quantity of revisions as an observable object.
    */
    public revisionsLength = this.quantitySubject.asObservable();

    /**
     * 
     * @param revisionService service to be used to fill the datasource
     */
    constructor(private revisionService: RevisionService) {

    }

    /**
     * 
     * @param sortSubject field to be used to sort the revisions
     * @param filter filter to be used to filter the revision
     * @param sortDirection sort direction either asc or desc
     * @param pageIndex number of the current page that the user is ar
     * @param pageSize number of revision per page
     */
    loadRevisions(sortSubject:string,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.revisionService.findRevisions(sortSubject, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((revisions) => {
                this.revisionsSubject.next(revisions['revision-history']);
                this.quantitySubject.next(revisions['revision-history-length']);
            });

    }


    /**
     * 
     * @param collectionViewer viewer to view the collection
     */
    connect(collectionViewer: CollectionViewer): Observable<RevisionMeta[]> {
        return this.revisionsSubject.asObservable();
    }

    /**
     * 
     * @param collectionViewer viewer to view the collection
     */
    disconnect(collectionViewer: CollectionViewer): void {
        this.revisionsSubject.complete();
        this.loadingSubject.complete();
        this.quantitySubject.complete();
    }
}