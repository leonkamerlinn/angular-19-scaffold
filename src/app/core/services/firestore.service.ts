import { combineLatest, filter, first, forkJoin, from, map, mergeMap, Observable, of } from 'rxjs';
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

  /**
   * Returns an AngularFirestoreCollection for a given path or existing collection reference.
   * @template T Type of the collection data.
   * @param ref Path to the collection or an existing AngularFirestoreCollection.
   * @param queryFn Optional query function to filter or sort the collection.
   * @returns AngularFirestoreCollection<T>
   */
  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this._afs.collection<T>(ref, queryFn) : ref;
  }

  /**
   * Returns an AngularFirestoreDocument for a given path or existing document reference.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @returns AngularFirestoreDocument<T>
   */
  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this._afs.doc<T>(ref) : ref;
  }

  // / **************
  // / Get Data
  // / **************

  /**
   * Retrieves a document as an Observable, including its ID.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @returns Observable<WithId<T>> Observable of the document data with its ID.
   */
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

  /**
   * Retrieves a collection as an Observable.
   * @template T Type of the collection data.
   * @param ref Path to the collection or an existing AngularFirestoreCollection.
   * @param queryFn Optional query function to filter or sort the collection.
   * @returns Observable<T[]> Observable of the collection data.
   */
  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => docs.map((a: DocumentChangeAction<T>) => a.payload.doc.data()) as T[])
      );
  }

  /**
   * Retrieves a collection as an Observable, with each document including its ID.
   * @template T Type of the collection data.
   * @param ref Path to the collection or an existing AngularFirestoreCollection.
   * @param queryFn Optional query function to filter or sort the collection.
   * @returns Observable<WithId<T>[]> Observable of the collection data, with each document including its ID.
   */
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

  /**
   * Sets data to a document, merging by default. Returns an Observable for completion.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @param data Data to set.
   * @param merge Whether to merge the new data with existing document data. Defaults to true.
   * @returns Observable<void>
   */
  set$<T>(ref: DocPredicate<T>, data: T, merge = true): Observable<void> {
    return from(this.set(ref, data, merge));
  }

  /**
   * Sets data to a document, merging by default. Returns a Promise.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @param data Data to set.
   * @param merge Whether to merge the new data with existing document data. Defaults to true.
   * @returns Promise<void>
   */
  set<T>(ref: DocPredicate<T>, data: T, merge = true): Promise<void> {
    return this.doc(ref).set(data, { merge });
  }

  /**
   * Updates data in a document. Returns a Promise.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @param data Data to update.
   * @returns Promise<void>
   */
  update<T>(ref: DocPredicate<T>, data: T): Promise<void> {
    return this.doc(ref).update(data);
  }

  /**
   * Updates data in a document. Returns an Observable for completion.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @param data Data to update.
   * @returns Observable<void>
   */
  update$<T>(ref: DocPredicate<T>, data: T): Observable<void> {
    return from(this.update(ref, data));
  }

  /**
   * Deletes a document. Returns an Observable with 'DELETED' on success.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @returns Observable<string>
   */
  delete$<T>(ref: DocPredicate<T>): Observable<string> {
    return from(this.delete(ref)).pipe(
      map(() => 'DELETED')
    );
  }

  /**
   * Deletes a document. Returns a Promise.
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @returns Promise<void>
   */
  delete<T>(ref: DocPredicate<T>): Promise<void> {
    return this.doc(ref).delete();
  }

  /**
   * Adds a document to a collection.
   * Optionally fetches the newly created document data with its ID.
   * @template T Type of the document data.
   * @param ref Path to the collection or an existing AngularFirestoreCollection.
   * @param data Data to add.
   * @param fetchData If true, fetches the document data after adding. Defaults to false.
   * @returns Observable<WithId<T> | null> Observable of the new document with ID if fetchData is true, otherwise null.
   */
  add$<T>(ref: CollectionPredicate<T>, data: T, fetchData = false): Observable<WithId<T> | null> {
    return from(this.col(ref).add(data)).pipe(mergeMap((doc) => (fetchData ? this.doc$<T>(doc.path) : of(null))));
  }

  /**
   * Updates a document if it exists, otherwise creates it (upsert).
   * @template T Type of the document data.
   * @param ref Path to the document or an existing AngularFirestoreDocument.
   * @param data Data to upsert.
   * @param merge Whether to merge data if updating. Defaults to true.
   * @returns Observable<void>
   */
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

  /**
   * Renames a property in all documents of a collection.
   * @param ref Path to the collection or an existing AngularFirestoreCollection.
   * @param change An object specifying the property name to change from and to.
   * @param queryFn Optional query function to filter or sort the collection.
   * @returns Observable<void[]> Observable that completes when all documents have been processed.
   */
  changeDocPropertyName$(
    ref: CollectionPredicate<any>,
    change: { from: string; to: string },
    queryFn?: QueryFn
  ): Observable<void[]> {
    return this.colWithIds$(ref, queryFn).pipe(
      first(),
      mergeMap((collection: WithId<any>[]) => {
        const updateObservables: Observable<void>[] = collection
          .map(doc => {
            if (doc[change.from] !== undefined) {
              const newDoc = { ...doc };
              const value = doc[change.from];
              delete newDoc[change.from];
              newDoc[change.to] = value;

              const docPath = `${this.col(ref).ref.path}/${doc.id}`;
              return this.set$<any>(docPath, newDoc, false);
            }
            return null;
          })
          .filter(obs => obs !== null) as Observable<void>[];

        if (updateObservables.length === 0) {
          return of([]);
        }
        return forkJoin(updateObservables);
      })
    );
  }
}
