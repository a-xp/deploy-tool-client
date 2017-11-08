import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../../profile.service";
import {RunnerService, Runner} from "../../../runner.service";
import {Project} from "../../../store/data/Project";
import {Store} from "@ngrx/store";
import {AppStore} from "../../../store/AppStore";
import {Instance} from "../../../store/data/Instance";
import {Build} from "../../../store/data/Build";
import {uiActions} from "../../../store/actions/ui";
import {selectCurrentProject} from "../../../store/process/ProjectEffects";

@Component({
  selector: 'app-view',
  templateUrl: 'view.component.html'
})
export class ProjectViewComponent implements OnInit {

  public project:Project;
  public runners:Runner[];
  public redmineIssuesUrl = 'http://redmine2.shoppinglive.local/issues/';

  constructor(private route: ActivatedRoute, private store:Store<AppStore>, private router:Router,
    private profileService:ProfileService, private runnerService:RunnerService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      console.log("route change", params);
      this.store.dispatch({type: uiActions.PROJECT_VIEW_CODE, value: params.code})
    });

    this.store.select(selectCurrentProject).subscribe(project => this.project = project);
    this.runnerService.get().then(l=>this.runners=l);
  }

  public hasFlag(build:Build, flag:string):boolean{
    return build.flags && build.flags.indexOf(flag)>-1;
  }

  public hasRight(right:string):boolean{
    return this.profileService.user && this.profileService.user.rights.indexOf(right)>-1;
  }

  public run():boolean{
    return true;
  }

  openParams() {
    this.router.navigateByUrl('/projects/'+this.project.code+'/params')
  }
}
