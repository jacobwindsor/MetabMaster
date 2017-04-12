import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {PathwayService} from "../pathway.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

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
  WPId: number;

  pathwayForm = new FormGroup({
    WPId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  entitySearchControl = new FormControl();

  filteredEntities: Observable<{id: string, text: string}[]>;

  constructor(public pathwayService: PathwayService, public auth: AuthService, public router: Router) { }

  filter(val: string): {id: string, text: string}[] {
    return this.entities.filter(entity => new RegExp(val, 'gi').test(entity.id + entity.text));
  }

  ngOnInit() {
    const WPIdControl = this.pathwayForm.get('WPId');

    WPIdControl.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        if (value && value.length > 0) {
          this.entities = [];
          this.WPId = parseInt(value, 10);
        }
      });
  }

  pathwayLoaded(instance: any) {
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

  savePathway() {
    // TODO: Only fire when form valid
    const formVal = this.pathwayForm.value;
    this.pathwayService.create({
      WPId: formVal.WPId,
      title: formVal.title,
      description: formVal.description,
      userId: this.auth.user.uid
    }).then(key => {
      this.router.navigate(['/pathway', key]);
    }).catch(err => {
      console.log(err);
    });
  }
}
