import {Injectable, OnInit} from '@angular/core';
import {AuthHttpService} from "./auth-http.service";
import {Response} from "@angular/http";
import {Broadcaster} from "./broadcaster";

@Injectable()
export class ProfileService implements OnInit{

  constructor(private http:AuthHttpService, private bus:Broadcaster) { }

  ngOnInit(): void {
    this.bus.on("user_login").subscribe(this.loadProfile);
    this.bus.on("user_logout").subscribe(()=>{
      this.user = null;
    });
  }

  public user:User;

  loadProfile() {
    if(localStorage.getItem("currentToken") && !this.user) {
      return this.http.get('http://localhost:9000/profile/current').toPromise()
          .then((response: Response) => {
            this.user = response.json();
            return this.user;
          });
    }
  }

}


export class User {
  public login: string;
  public rights: Array<string>;
}