import { Injectable } from '@angular/core';
import {Pathway, PathwayService} from "./pathway.service";
import {Observable, Subject} from "rxjs/Rx";

@Injectable()
export class PathwayListService {
  private limit = 10;
  private lastPathway: Pathway;
  private pathwayList: Subject<Pathway[]> = new Subject();
  // Should be a list of the pathways ordered and however many has been requested
  pathwayList$: Observable<Pathway[]> = this.pathwayList.asObservable();
  private curSource: Observable<Pathway> = Observable.empty();

  constructor(private pathways: PathwayService) { }

  next() {
    // Add one to the timestamp since the pathwayService list is inclusive
    const startAt = this.lastPathway ? this.lastPathway.reversedCreatedAt + 1 : null;
    this.curSource = Observable.merge(
      this.curSource,
      this.pathways.list(this.limit, startAt)
    ).startWith(null);

    this.curSource
      .scan((acc, x) => {
        if (! x) { return acc; }
        acc.push(x);
        return acc;
      }, [])
      .map(pathways => {
        const sorted = pathways.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        });
        return sorted;
      }).subscribe(pathways => {
        if (pathways.length > 0) {
          this.lastPathway = pathways[pathways.length - 1];
        }
        this.pathwayList.next(pathways);
    });
  }

  setLimit(limit: number): PathwayListService {
    this.limit = limit;
    return this;
  }
}
