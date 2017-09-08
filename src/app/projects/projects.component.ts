import { Component, OnInit } from '@angular/core';
import {ProjectService, Project} from "../project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projects:Project[];
  public type = 'service';
  public ff =2;

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().then(list=>this.projects = list);
  }

}
