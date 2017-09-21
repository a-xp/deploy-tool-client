import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Build, BuildService} from "../../build.service";
import {Project, ProjectService} from "../../project.service";
import {ProfileService} from "../../profile.service";
import {RunnerService, Runner} from "../../runner.service";
import {Instance, InstanceService} from "../../instance.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {

  public code:string;
  public project:Project;
  public runners:Runner[];
  public instances:Instance[];
  public builds:Build[];
  public qaBuilds:Build[];
  public redmineIssuesUrl = 'http://redmine2.shoppinglive.local/issues/';

  constructor(private route: ActivatedRoute, private buildService:BuildService, private projectService:ProjectService,
    private profileService:ProfileService, private runnerService:RunnerService, private instanceService:InstanceService) { }

  ngOnInit() {
    this.code = this.route.snapshot.params["code"];

    this.projectService.get(this.code).then(
        p=>{
          this.project = p;
          this.buildService.getBuilds(this.project.id).then(l=>this.builds=l);
          this.buildService.getQABuilds(this.project.id).then(l=>this.qaBuilds=l);
          this.instanceService.getForProject(this.project.id).then(l=>this.instances=l);
        }
    );

    this.runnerService.get().then(l=>this.runners=l);
  }

  public hasFlag(build:Build, flag:string):boolean{
    return build.flags && build.flags.indexOf(flag)>-1;
  }

  public hasRight(right:string):boolean{
    return this.profileService.user && this.profileService.user.rights.indexOf(right)>-1;
  }
}
