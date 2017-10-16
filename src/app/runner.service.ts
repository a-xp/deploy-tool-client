import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RunnerService {

  private list;

  constructor(private http:HttpClient) { }

  public get():Promise<Runner[]>{
    if(this.list!=undefined){
      return Promise.resolve(this.list);
    }else{
      return this.http.get<Runner[]>("http://localhost:9000/runners").toPromise()
          .then(res=>{
            this.list = res.map(v=>new Runner(v));
            return this.list;
          });
    }
  }

}

export class Runner{
  public ip:string;
  public hostName:string;

  constructor(v:any) {
    Object.assign(this, v);
  }
}
