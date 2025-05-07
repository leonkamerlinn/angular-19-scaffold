import { combineLatest, filter, first, from, map, mergeMap, Observable, of } from 'rxjs';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { inject, Injectable } from '@angular/core';

export type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
export type DocPredicate<T> = string | AngularFirestoreDocument<T>;
export type WithId<T> = T & {
  id: string;
};

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private _afs = inject(AngularFirestore);

  // / **************
  // / Get a Reference
  // / **************

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this._afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this._afs.doc<T>(ref) : ref;
  }

  // / **************
  // / Get Data
  // / **************

  // returns document object
  doc$<T>(ref: DocPredicate<T>): Observable<WithId<T>> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map((doc: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
          const obj = doc.payload.data() as T;

          return {
            ...obj,
            id: doc.payload.id,
          };
        })
      );
  }

  // returns collection
  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => docs.map((a: DocumentChangeAction<T>) => a.payload.doc.data()) as T[])
      );
  }

  // / returns collection with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<WithId<T>[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<T>[]) =>
          actions.map((a: DocumentChangeAction<T>) => {
            const data: T = a.payload.doc.data() as T;
            const id: string = a.payload.doc.id;
            const obj: WithId<T> = { id, ...data };

            return obj;
          })
        )
      );
  }

  // / **************
  // / Write Data
  // / **************

  /* SET*/
  set$<T>(ref: DocPredicate<T>, data: T, merge = true): Observable<void> {
    return from(this.set(ref, data, merge));
  }

  set<T>(ref: DocPredicate<T>, data: T, merge = true): Promise<void> {
    return this.doc(ref).set(data, { merge });
  }

  /* UPDATE*/

  update<T>(ref: DocPredicate<T>, data: T): Promise<void> {
    return this.doc(ref).update(data);
  }

  update$<T>(ref: DocPredicate<T>, data: T): Observable<void> {
    return from(this.update(ref, data));
  }

  /* DELETE*/

  delete$<T>(ref: DocPredicate<T>): Observable<string> {
    return from(
      new Promise<string>((resolve, reject) => {
        try {
          this.delete(ref).then();

          return resolve('DELETED');
        } catch (e) {
          return reject(e);
        }
      })
    );
  }

  delete<T>(ref: DocPredicate<T>): Promise<void> {
    return this.doc(ref).delete();
  }

  /* ADD*/

  add$<T>(ref: CollectionPredicate<T>, data: T, fetchData = false): Observable<WithId<T> | null> {
    return from(this.col(ref).add(data)).pipe(mergeMap((doc) => (fetchData ? this.doc$<T>(doc.path) : of(null))));
  }

  // If doc exists update, otherwise set
  upsert$<T>(ref: DocPredicate<T>, data: T, merge = true): Observable<void> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        first(),
        mergeMap((snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
          return snap.payload.exists ? this.update$<T>(ref, data) : this.set$<T>(ref, data, merge);
        })
      );
  }

  changeDocPropertyName$(
    ref: CollectionPredicate<any>,
    change: { from: string; to: string },
    queryFn?: QueryFn
  ): Observable<any> {
    return this.colWithIds$(ref, queryFn).pipe(
      map((col) =>
        col.map((doc) => {
          if (doc[change.from]) {
            const newDoc = { ...doc };
            const value = doc[change.from];
            delete newDoc[change.from];
            newDoc[change.to] = value;
            const document = this.col<any>(ref).doc(doc.id);

            return this.set$(document.ref.path, newDoc, false);
          }

          return null;
        })
      ),
      filter((item) => item !== null),
      mergeMap((docs: any) => combineLatest([docs]))
    );
  }
}
