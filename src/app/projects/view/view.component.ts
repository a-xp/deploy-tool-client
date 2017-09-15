import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Build, BuildService} from "../../build.service";
import {Project, ProjectService} from "../../project.service";
import {ProfileService} from "../../profile.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public code:string;
  public project:Project;
  public builds:Build[];
  public qaBuilds:Build[];
  public redmineIssuesUrl = 'http://redmine2.shoppinglive.local/issues/';

  constructor(private route: ActivatedRoute, private buildService:BuildService, private projectService:ProjectService,
    private profileService:ProfileService) { }

  ngOnInit() {
    this.code = this.route.snapshot.params["code"];

    this.projectService.get(this.code).then(
        p=>{
          this.project = p;
          this.buildService.getBuilds(this.project.id).then(l=>this.builds=l);
          this.buildService.getQABuilds(this.project.id).then(l=>this.qaBuilds=l);
        }
    );
  }

  public hasFlag(build:Build, flag:string):boolean{
    return build.flags && build.flags.indexOf(flag)>-1;
  }

  public hasRight(right:string):boolean{
    return this.profileService.user && this.profileService.user.rights.indexOf(right)>-1;
  }
}
