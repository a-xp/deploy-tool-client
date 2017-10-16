import { Component, OnInit } from '@angular/core';
import {ProjectService, Project} from "../../project.service";

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html'
})
export class ProjectsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
