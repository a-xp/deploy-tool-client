import { Component, OnInit } from '@angular/core';
import {Project, ProjectService} from "../../project.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public projects:Project[];
  public type = 'service';
  public ff =2;

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().then(list=>this.projects = list);
  }


}
