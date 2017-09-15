import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AuthHttpService} from "./auth-http.service";

@Injectable()
export class ProjectService {

  constructor(private http:AuthHttpService) { }

  public getAll():Promise<Project[]>{
        return this.http.get("http://localhost:9000/projects").toPromise()
            .then(res=>res.json().map(d=>new Project(d)))
            .catch(err=>Promise.reject(err.json()));
  }

  public get(code:string):Promise<Project>{
      return this.http.get("http://localhost:9000/projects/"+code).toPromise()
          .then(res=>new Project(res.json()))
          .catch(err=>Promise.reject(err.json().message));
  }

}


export class Project{
    id:number;
    name:string;
    code:string;
    description:string;

    constructor(json){
        Object.assign(this, json);
    }
}