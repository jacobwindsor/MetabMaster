import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {Observable, Subject} from "rxjs/Rx";

export interface Pathway {
  id: string;
  WPId: number;
  title: string;
  description: string;
  userId: string;
  createdAt: number;
  reversedCreatedAt: number;
}

@Injectable()
export class PathwayService {
  private lastReversedCreatedAt: number;
  private pathwayList: Subject<Pathway> = new Subject();
  pathwayList$: Observable<Pathway> = this.pathwayList.asObservable();

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
  get(id: string): Observable<Pathway> {
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
   * @param startAt - The timestamp to start at (inclusive)
   * @returns {Observable}
   */
  list(limit = 10, startAt?): Observable<Pathway[]> {
    return Observable.create(observer => {
      let ref = this.fb.db.ref('pathways').orderByChild('reversedCreatedAt').limitToFirst(limit);
      if (startAt) {
        ref = ref.startAt(startAt);
      }

      ref.once('value', snapshot => {
        const pathways = [];
        snapshot.forEach(singlePathway => {
          pathways.push(
            Object.assign({id: singlePathway.key}, singlePathway.val())
          );
        });
        observer.next(pathways);
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
