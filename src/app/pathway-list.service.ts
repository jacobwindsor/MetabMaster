import { Injectable } from '@angular/core';
import {Pathway, PathwayService} from "./pathway.service";
import {Observable, Subject} from "rxjs/Rx";

@Injectable()
export class PathwayListService {
  constructor(private pathways: PathwayService) { }


}
