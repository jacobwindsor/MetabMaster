import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {PathwayService} from "../pathway.service";
import {AuthService} from "../auth.service";

declare var Pvjs: any;

@Component({
  selector: 'app-pathway-create',
  templateUrl: './pathway-create.component.html',
  styleUrls: ['./pathway-create.component.css']
})
export class PathwayCreateComponent implements OnInit {
  @ViewChild('pathwayWrapper') pathwayElem;
  private pathwayInstance: any;
  entities: {id: string, text: string}[] = []; // List of the entity IDs

  pathwayForm = new FormGroup({
    WPId: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl('')
  });

  entitySearchControl = new FormControl();

  filteredEntities: Observable<{id: string, text: string}[]>;

  constructor(public pathwayService: PathwayService, public auth: AuthService) { }

  filter(val: string): {id: string, text: string}[] {
    return this.entities.filter(entity => new RegExp(val, 'gi').test(entity.id + entity.text));
  }

  ngOnInit() {
    this.renderPathway();
  }

  renderEntitySearch() {
    this.filteredEntities = this.entitySearchControl.valueChanges
      .do(val => {
        const toHighlight = this.entities.find(entity => entity.id === val);
        if (toHighlight) {
          this.pathwayInstance.manipulator.highlightOn(toHighlight.id, 'red');
        }
      })
      .map(val => val ? this.filter(val) : this.entities.slice());
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
          Pvjs.loadDiagram('#pathway', 'WP' + value, {
            width: '100%',
            height: '100%'
          }, instance => {
            this.pathwayInstance = instance;
            instance.ready.subscribe(ready => {
              if (ready) {
                this.entities = instance.manipulator.getEntities()
                  .filter(entity => entity.kaavioType === 'Node') // Only do Nodes for now
                  .filter(entity => entity.textContent) // Only show those with text (Metabolites/Genes/Rna)
                  .map(entity => {
                    return {
                      id: entity.id,
                      text: entity.textContent
                    };
                  });

                this.renderEntitySearch();
              }
            });
          });
        }
      });
  }

  savePathway() {
    if (this.pathwayForm.errors) {
      return;
    }

    const formVal = this.pathwayForm.value;
    this.pathwayService.create({
      WPId: formVal.WPId,
      title: formVal.title,
      description: formVal.description,
      userId: this.auth.user.uid
    });
  }
}
