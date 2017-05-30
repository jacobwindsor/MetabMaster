import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CompoundService } from '../compound.service';
import {Observable, Subject} from "rxjs/Rx";
import * as _ from 'lodash';
import {NotifierService} from "../notifier.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit, OnDestroy {
  loading: boolean;
  limit = 10;
  compounds = [];
  activeCompoundSet: any;
  private curPage = 0;
  private clickEvent$: Subject<boolean> = new Subject();
  private onDestroy$ = new Subject<boolean>();
  constructor(public compoundService: CompoundService, private notifier: NotifierService) { }

  ngOnInit() {
    this.loading = true;
    this.clickEvent$
      .startWith(true)
      .map(() => this.curPage * this.limit)
      .exhaustMap(skip =>
        this.compoundService.list(skip, this.limit),
        (skip, compounds) => compounds
      )
      .takeUntil(this.onDestroy$)
      .subscribe(compounds => {
        this.compounds = this.compounds.concat(compounds);
        console.log(this.compounds)
        this.loading = false;
      }, err => {
        this.notifier.notify(`Oops! Failed to get the compounds set. <strong>Message:</strong> ${err.message}`,
          'error');
      });
  }

  getNext() {
    this.curPage = this.curPage + 1;
    this.clickEvent$.next(true);
    this.loading = true;
  }

  onActiveCompoundSet(compound) {
    this.activeCompoundSet = compound;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
