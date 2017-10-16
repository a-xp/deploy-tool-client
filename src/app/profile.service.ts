import {Injectable, OnInit} from '@angular/core';
import {Broadcaster} from "./broadcaster";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProfileService implements OnInit{

  constructor(private http:HttpClient, private bus:Broadcaster) { }

  ngOnInit(): void {
    this.bus.on("user_login").subscribe(this.loadProfile);
    this.bus.on("user_logout").subscribe(()=>{
      this.user = null;
    });
  }

  public user:User;

  loadProfile() {
    if(localStorage.getItem("currentToken") && !this.user) {
      return this.http.get<User>('http://localhost:9000/profile/current').toPromise()
          .then((response) => {
            this.user = response;
            return this.user;
          });
    }
  }

}


export class User {
  public login: string;
  public rights: Array<string>;
}