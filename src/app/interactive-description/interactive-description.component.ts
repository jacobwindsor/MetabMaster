import {Component, Input, OnInit} from '@angular/core';
import {getShowdown} from '@wikipathways/kaavio-showdown';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-interactive-description',
  templateUrl: './interactive-description.component.html',
  styleUrls: ['./interactive-description.component.scss']
})
export class InteractiveDescriptionComponent {

  description: string;

  @Input() pathwayInstance: any; // TODO: set type to Pvjs
  @Input() set markdown (markdown: string){ this.parseMarkdown(markdown); };
  @Input() title: string;

  showdown = getShowdown(this.pathwayInstance);
  converter = new this.showdown.Converter({extensions: ['kaavio']});

  constructor(private sanitizer: DomSanitizer) { }

  parseMarkdown(markdown: string): void {
    this.description = <string>this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(markdown));
  }
}
