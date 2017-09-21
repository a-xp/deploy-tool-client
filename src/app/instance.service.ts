import { Injectable } from '@angular/core';
import {AuthHttpService} from "./auth-http.service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InstanceService {

  constructor(private http:AuthHttpService) {
  }

  public getForProject(id:number):Promise<Instance[]>{
    return this.http.get("http://127.0.0.1:9000/projects/"+id+"/instances").toPromise()
        .then(res=>res.json().map(v=>new Instance(v)))
  }

}

export class Instance{
  public version: string;
  public pid:number;
  public server:string;
  public port:number;
  public uptime:number;

  public constructor(v:any){
    Object.assign(this,v);
  }

}