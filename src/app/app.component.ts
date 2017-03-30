import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Pvjs} from 'pvjs';
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('pathway') pathwayElem;
  ngOnInit() {
    console.log(this.pathwayElem)
    Pvjs('#pathway', 'WP9', {}, instance => {
      window.pvjs_instance = instance;
    });
  }
}
