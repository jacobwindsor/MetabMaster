import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

declare var Pvjs: any;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
  @Input('WPId') WPId: number;
  // TODO: Use Pvjs type when can remove delcaration
  @Output() pathwayInstance = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    Pvjs.loadDiagram('#pathway', 'WP' + this.WPId, {
      width: '100%',
      height: '100%'
    }, instance => {
      this.pathwayInstance.emit(instance);
    });
  }

}
