import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var Pvjs: any;

@Component({
  selector: 'app-pathway-create',
  templateUrl: './pathway-create.component.html',
  styleUrls: ['./pathway-create.component.css']
})
export class PathwayCreateComponent implements OnInit {
  @ViewChild('pathwayWrapper') pathwayElem;
  private pathwayInstance: any;
  entities: string[] = []; // List of the entity IDs

  pathwayForm = new FormGroup({
    WPId: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    this.renderPathway();
  }

  renderPathway() {
    const WPIdControl = this.pathwayForm.get('WPId');

    WPIdControl.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        if (value && value.length > 0) {
          this.entities = [];
          this.pathwayElem.nativeElement.innerHTML = '';
          console.log(this.pathwayElem.nativeElement.innerHTML);
          Pvjs.loadDiagram('#pathway', 'WP' + value, {
            width: '100%',
            height: '100%'
          }, instance => {
            this.pathwayInstance = instance;
            instance.ready.subscribe(ready => {
              if (ready) {
                this.entities = instance.manipulator.getEntities().map(entity => entity.id);
              }
            });
          });
        }
      });
  }
}
