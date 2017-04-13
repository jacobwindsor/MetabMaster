import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {getShowdown} from '@wikipathways/kaavio-showdown';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-interactive-description',
  templateUrl: './interactive-description.component.html',
  styleUrls: ['./interactive-description.component.scss']
})
export class InteractiveDescriptionComponent implements OnChanges {

  private _pathwayInstance: any; // TODO: set type to Pvjs
  private _markdown: string;
  description: string;

  @Input() pathwayInstance: any; // TODO: set type to Pvjs
  @Input() markdown: string;
  @Input() title: string;


  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const changeToMarkdown = changes['markdown'];
    const changeToPathwayInstance = changes['pathwayInstance'];

    if (changeToMarkdown
      && (changeToMarkdown.currentValue !== changeToMarkdown.previousValue)) {
      // Store the markdown
      this._markdown = changeToMarkdown.currentValue;
    }

    if (changeToPathwayInstance && changeToPathwayInstance.currentValue) {
      // Store the instance
      this._pathwayInstance = changeToPathwayInstance.currentValue;
    }

    if (this._pathwayInstance && this._markdown) {
      // Only render description when instance and markdown are available
      // kaavio-showdown requires the pathway instance
      const showdown = getShowdown(this._pathwayInstance);
      const converter = new showdown.Converter({extensions: ['kaavio']});

      this.description = <string>this.sanitizer.bypassSecurityTrustHtml(
        converter.makeHtml(this._markdown)
      );
    }
  }
}
