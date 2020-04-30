import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { RevisionMeta } from '../models/revision.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RevisionService } from './revision.service';
import { catchError, finalize } from 'rxjs/operators';


export class RevisionsDataSource implements DataSource<RevisionMeta> {

    private revisionsSubject = new BehaviorSubject<RevisionMeta[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private quantitySubject  = new BehaviorSubject<number>(0);
    public loading$ = this.loadingSubject.asObservable();
    public revisionsLength = this.quantitySubject.asObservable();

    constructor(private revisionService: RevisionService) {

    }

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
                this.quantitySubject.next(revisions['revisions-length']);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<RevisionMeta[]> {
        console.log("Connecting data source");
        return this.revisionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.revisionsSubject.complete();
        this.loadingSubject.complete();
        this.quantitySubject.complete();
    }
}