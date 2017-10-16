import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProjectService {

  constructor(private http:HttpClient) { }

  public getAll():Promise<Project[]>{
        return this.http.get<Project[]>("http://localhost:9000/projects").toPromise()
            .then(res=>res.map(d=>new Project(d)))
            .catch(err=>Promise.reject(err.json()));
  }

  public get(code:string):Promise<Project>{
      return this.http.get<Project>("http://localhost:9000/projects/"+code).toPromise()
          .then(res=>new Project(res))
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