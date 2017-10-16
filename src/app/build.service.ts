import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BuildService {

  constructor(private http:HttpClient) {
  }

  public getBuilds(projectId:number):Promise<Build[]> {
    return this.http.get<Build[]>("http://localhost:9000/projects/"+projectId+"/builds").toPromise()
        .then(response=>response.map(b=>Build.fromJson(b)))
        .catch(response=>Promise.reject(response.json().message));
  }

  public getQABuilds(projectId:number):Promise<Build[]> {
    return this.http.get<Build[]>("http://localhost:9000/projects/"+projectId+"/qa-builds").toPromise()
        .then(r=>{
          if(!r)throw "invalid response";
          return r.map(b=>Build.fromJson(b))
        }).catch(r=>{console.log(r);}) as Promise<Build[]>;
  }

}

export class Build {

  constructor(public version: string, public pipelineId: number, public env: string, public date: number, public author: string,
    public message:string, public features:Array<Task>, public flags:Array<string>) {  }

  public static fromJson(v:any):Build{
    let build = Object.create(Build.prototype);
    Object.assign(build, v);
    return build;
  }
}

export class Task {
  constructor(public id:number, public name:string){ };
}