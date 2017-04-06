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
  create(WPId: number, values: {description: string, userId: string}): Promise<any> {
    return this.fb.db.ref('pathways/' + WPId).set(values);
  }

  /**
   * Get a specific pathway.
   * @param WPId
   * @returns {Observable}
   */
  get(WPId: number): Observable<{WPId: number, description: string, userId: string}> {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      this.fb.db.ref('pathways/' + WPId).once('value').then(snapshot => {
        const val = snapshot.val();
        resolve({
          WPId: snapshot.key(),
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
   * @param WPId
   * @param updates
   */
  update(WPId: number, updates: {description: string}): Promise<any> {
    return this.fb.db.ref('pathways/' + WPId).update(updates);
  }

  /**
   * Delete a pathway
   * @param WPId
   */
  destroy(WPId: number): void {
    this.fb.db.ref('pathways/' + WPId).remove();
  }

  /**
   * List all the pathways in ascending order. Ordered by the value of the WPId
   * @param limit - number of entries to return
   * @param startAt - The WPId to start at (inclusive)
   * @returns {Observable}
   */
  list(limit = 25, startAt?): Observable<{WPId: number, description: string, userId: string}[]> {
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
              WPId: data.key(),
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
