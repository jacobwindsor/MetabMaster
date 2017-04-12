import {Component, Input, OnInit} from '@angular/core';
import {getShowdown} from '@wikipathways/kaavio-showdown';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-interactive-description',
  templateUrl: './interactive-description.component.html',
  styleUrls: ['./interactive-description.component.scss']
})
export class InteractiveDescriptionComponent implements OnInit {

  @Input() pathwayInstance: any; // TODO: set type to Pvjs
  @Input() set markdown(markdown: string){ this.parseMarkdown(markdown); }; // The markdown to parse
  @Input() title: string;

  description: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.description = '';
  }

  parseMarkdown(markdown: string): void {
    const showdown = getShowdown(this.pathwayInstance);
    const converter = new showdown.Converter({extensions: ['kaavio']});
    this.description = this.sanitizer.bypassSecurityTrustHtml(converter.makeHtml(markdown)) as string;
  }

}
