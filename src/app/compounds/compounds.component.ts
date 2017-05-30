import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// Presentational component
@Component({
  selector: 'app-compounds',
  templateUrl: './compounds.component.html',
  styleUrls: ['./compounds.component.scss']
})
export class CompoundsComponent implements OnInit {
  @Input() compounds: any[];
  activeCompoundSetId: string;
  @Output() activeCompoundSet = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clickItem(compound) {
    this.activeCompoundSetId = compound._id;
    this.activeCompoundSet.emit(compound);
  }
}
