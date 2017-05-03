import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs/Rx";
import {PathwayService} from "../pathway.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UniversalValidators} from 'ng2-validators';

@Component({
  selector: 'app-pathway-edit',
  templateUrl: './pathway-edit.component.html',
  styleUrls: ['./pathway-edit.component.scss']
})
export class PathwayEditComponent implements OnInit {
  // Initial values
  @Input() WPId: number;
  @Input() markdown: string;
  @Input() title: string;

  // Emit when saved with form values
  @Output() onSave = new EventEmitter<any>(); // TODO: Add type of form values

  pathwayInstance: any;
  entities: {id: string, text: string}[] = []; // List of the entity IDs

  pathwayForm = new FormGroup({
    WPId: new FormControl('', Validators.compose([Validators.required, UniversalValidators.isNumber])),
    title: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)])),
    markdown: new FormControl('', Validators.required)
  });

  formErrors = {
    'WPId': '',
    'title': '',
    'markdown': ''
  };

  validationMessages = {
    'WPId': {
      'required': 'You must enter a WikiPathways ID!',
      'numberRequired': 'The ID must be a number. Exclude the \'WP\' part.'
    },
    'title': {
      'required': 'You must enter a title!',
      'maxlength': 'The title must be under 100 characters long.'
    },
    'markdown': {
      'required': 'Provide an interactive description!'
    }
  };

  entitySearchControl = new FormControl();

  filteredEntities: Observable<{id: string, text: string}[]>;

  constructor(public pathwayService: PathwayService, public auth: AuthService, public router: Router) { }

  ngOnInit() {
    // Set the initial form values if specified
    this.pathwayForm.setValue({
      WPId: this.WPId || '',
      title: this.title || '',
      markdown: this.markdown || ''
    });

    this.pathwayForm.valueChanges
      .debounceTime(200)
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.pathwayForm) { return; }

    const form = this.pathwayForm;

    this.WPId = form.get('WPId').value;
    this.title = form.get('title').value;
    this.markdown = form.get('markdown').value;

    // Validation
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  pathwayLoaded = (instance: any) => {
    instance.ready.subscribe(ready => {
      if (ready) {
        this.pathwayInstance = instance;
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

  filter = (val: string) => {
    return this.entities.filter(entity => new RegExp(val, 'gi').test(entity.id + entity.text));
  }

  renderEntitySearch = () => {
    this.filteredEntities = this.entitySearchControl.valueChanges
      .do(val => {
        const toHighlight = this.entities.find(entity => entity.id === val);
        if (toHighlight) {
          this.pathwayInstance.manipulator.reset();
          this.pathwayInstance.manipulator.highlightOn(toHighlight.id, 'red');
        }
      })
      .map(val => val ? this.filter(val) : this.entities.slice());
  }

  save = () => {
    if (! this.pathwayForm.valid) { return; };
    const formVal = this.pathwayForm.value;
    this.onSave.emit(formVal);
  }
}
