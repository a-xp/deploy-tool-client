import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class InstanceService {

  constructor(private http:HttpClient) {
  }

  public getForProject(id:number):Promise<Instance[]>{
    return this.http.get<Instance[]>("http://127.0.0.1:9000/projects/"+id+"/instances").toPromise()
        .then(res=>res.map(v=>new Instance(v)))
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