import { Component, OnInit } from '@angular/core';
import {Project, ProjectService} from "../../../project.service";

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html'
})
export class ProjectListComponent implements OnInit {
  public projects:Project[];
  public type = 'service';

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().then(list=>this.projects = list);
  }

  createForm(){
    location.href = '/projects/new';
  }
}
