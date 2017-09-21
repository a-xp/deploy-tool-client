import { Injectable } from '@angular/core';
import {AuthHttpService} from "./auth-http.service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RunnerService {

  private list;

  constructor(private http:AuthHttpService) { }

  public get():Promise<Runner[]>{
    if(this.list!=undefined){
      return Promise.resolve(this.list);
    }else{
      return this.http.get("http://localhost:9000/runners/").toPromise()
          .then(res=>{
            this.list = res.json().map(v=>new Runner(v))
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
