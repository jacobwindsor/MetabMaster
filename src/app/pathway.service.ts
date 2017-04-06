import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class PathwayService {

  constructor(public fb: FirebaseService) { }

  /**
   * Create a pathway
   * @param WPId - The ID for the WikiPathways pathway. Exclude the 'WP'. E.g. use 78 for TCA cycle
   * @param values
   */
  create(values: {WPId: number, title: string, description: string, userId: string}): Promise<any> {
    const ref = this.fb.db.ref('pathways').push();
    return ref.set(values);
  }

  /**
   * Get a specific pathway.
   * @param id
   * @returns {Observable}
   */
  get(id: string): Observable<{id: string, WPId: number, title: string, description: string, userId: string}> {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      this.fb.db.ref('pathways/' + id).once('value').then(snapshot => {
        const val = snapshot.val();
        resolve({
          id: snapshot.key(),
          WPId: val.WPId,
          title: val.title,
          description: val.description,
          userId: val.userId
        });
      }).catch(err => {
        reject(err);
      });
    }));
  }

  /**
   * Update a specific pathway
   * @param id
   * @param updates
   */
  update(id: string, updates: {title: string, description: string}): Promise<any> {
    return this.fb.db.ref('pathways/' + id).update(updates);
  }

  /**
   * Delete a pathway
   * @param id
   */
  destroy(id: string): void {
    this.fb.db.ref('pathways/' + id).remove();
  }

  /**
   * List all the pathways in ascending order. Ordered by the value of the WPId
   * @param limit - number of entries to return
   * @param startAt - The id to start at (inclusive)
   * @returns {Observable}
   */
  list(limit = 25, startAt?): Observable<{id: string, WPId: number, title: string, description: string, userId: string}[]> {
    return Observable.create(observer => {
      const ref = this.fb.db.ref('pathways').orderByKey().limitToFirst(limit);
      if (startAt) {
        ref.startAt(startAt);
      }

      ref.on('value', snapshot => {
        const returnVal = [];
        snapshot.forEach(data => {
          const val = data.val();
          returnVal.push(
            {
              id: data.key(),
              WPId: val.WPId,
              title: val.title,
              description: val.description,
              userId: val.userId
            }
          );
        });
        observer.onNext(returnVal);
      });
    });
  }
}
