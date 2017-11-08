import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppStore} from "../../../store/AppStore";
import {projectActions} from "../../../store/actions/projects";
import {Project} from "../../../store/data/Project";

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html'
})
export class ProjectListComponent implements OnInit {
  public projects:Project[];
  public type = 'service';

  constructor(private store:Store<AppStore>, private router:Router) { }

  ngOnInit() {
    if(!this.projects)this.store.dispatch({type:projectActions.LOAD_LIST});
    this.store.select('projects').subscribe(v=> {this.projects = v});
  }

  createForm(){
    this.router.navigateByUrl('/projects/new');
  }
}
