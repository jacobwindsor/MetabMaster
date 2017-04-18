import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class PathwayService {

  constructor(public fb: FirebaseService) {
  }

  /**
   * Create a pathway
   * @param values
   */
  create(values: { WPId: number, title: string, description: string, userId: string }): Promise<any> {
    const ref = this.fb.db.ref('pathways').push();
    const timestamp = Date.now();
    const toSet = Object.assign({
      createdAt: timestamp,
      reversedCreatedAt: -timestamp
    }, values);

    return new Promise((resolve, reject) => {
      ref.set(toSet)
        .then(resolve(ref.key))
        .catch(err => reject(err));
    });
  }

  /**
   * Get a specific pathway.
   * @param id
   * @returns {Observable}
   */
  get(id: string): Observable<{ id: string, WPId: number, title: string, description: string, userId: string }> {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      this.fb.db.ref('pathways/' + id).once('value').then(snapshot => {
        const val = snapshot.val();
        resolve({
          id: snapshot.key,
          WPId: val.WPId,
          title: val.title,
          description: val.description,
          userId: val.userId,
          createdAt: val.createdAt,
          reversedCreatedAt: val.reversedCreatedAt
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
  update(id: string, updates: {WPId: number, title: string, description: string }): Promise<any> {
    return this.fb.db.ref('pathways/' + id).update(updates);
  }

  /**
   * Delete a pathway
   * @param id
   */
  destroy(id: string): Promise<any> {
    return this.fb.db.ref('pathways/' + id).remove();
  }

  /**
   * List all the pathways in ascending order. Ordered by the value of the WPId
   * @param limit - number of entries to return
   * @param startAt - The id to start at (inclusive)
   * @returns {Observable}
   */
  list(limit = 25, startAt?): Observable<{ id: string, WPId: number, title: string, description: string, userId: string }[]> {
    return Observable.create(observer => {
      const ref = this.fb.db.ref('pathways').orderByChild('reversedCreatedAt').limitToFirst(limit);
      if (startAt) {
        ref.startAt(startAt);
      }

      ref.on('child_added', snapshot => {
        const returnVal = [];
        const val = snapshot.val();
        returnVal.push(
          {
            id: snapshot.key,
            WPId: val.WPId,
            title: val.title,
            description: val.description,
            userId: val.userId
          });
        observer.next(returnVal);
      });
    });
  }

  /**
   * Get the static image URL from a WikiPathways ID
   * @param WPId
   * @returns {string}
   */
  staticImageUrlFromWPId(WPId: number): string {
    return `http://www.wikipathways.org/wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP${WPId}`;
  }
}
