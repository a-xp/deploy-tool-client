import { Component, OnInit } from '@angular/core';
import {Project} from "../../../store/data/Project";
import {ProjectParams} from "../../../store/data/ProjectParams";
import {AppStore} from "../../../store/AppStore";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {uiActions} from "../../../store/actions/ui";
import {selectCurrentProject} from "../../../store/process/ProjectEffects";
import {projectActions} from "../../../store/actions/projects";
import {project} from "../../../mock/data/project";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-project-params',
  templateUrl: './project-params.component.html',
})
export class ProjectParamsComponent implements OnInit {

  project: Project;

  constructor(private route: ActivatedRoute, private store:Store<AppStore>, private router:Router) { }

  ngOnInit() {
      this.route.params.subscribe(params=>this.store.dispatch({type: uiActions.PROJECT_VIEW_CODE, value: params.code}));
      this.store.select(selectCurrentProject).subscribe(project=>{
          this.project = project;
      });
  }

  cancel(){
    this.router.navigateByUrl("/projects/"+this.project.code);
  }

  save(form: NgForm){
      this.store.dispatch({type: projectActions.SAVE_PARAMS, projectId: project.id, value: form.value});
      return false;
  }

}

