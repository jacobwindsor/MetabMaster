import {Component, Input, OnInit} from '@angular/core';
import { orderBy } from 'lodash';

// Presentational component
@Component({
  selector: 'app-compound-detail',
  templateUrl: './compound-detail.component.html',
  styleUrls: ['./compound-detail.component.scss']
})
export class CompoundDetailComponent implements OnInit {
  private _compoundSet: any;
  @Input() set compoundSet(compoundSet) {
    const toSet = Object.assign({}, compoundSet);
    toSet.compounds = toSet.compounds.map(singleCompound => {
      const totalHits = singleCompound.metaCyc.pathwayCount + singleCompound.metaCyc.reactionCount +
          singleCompound.pubChem.pathwayCount + singleCompound.pubChem.assayCount;
      return Object.assign({}, singleCompound, {totalHits});
    });

    toSet.compounds = orderBy(toSet.compounds, ['totalHits'], ['desc']);
    this._compoundSet = toSet;
  }

  get compoundSet() {
    return this._compoundSet;
  }

  constructor() { }

  ngOnInit() {
  }
}
