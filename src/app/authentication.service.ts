import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Broadcaster} from "./broadcaster";

@Injectable()
export class AuthenticationService {
  readonly tokenKey = "currentToken";

  constructor(private http: Http, private bus:Broadcaster) { }

  login(username: string, password: string) {
    return this.http.post('http://localhost:9000/login', { username: username, password: password })
        .map((response: Response) => {
          if(response.headers.has("Authorization")){
            let token = response.headers.getAll("Authorization")[0];
            localStorage.setItem(this.tokenKey, token);
            this.bus.broadcast("user_login");
            return token
          }
          throw "Failed to authorize";
        });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.bus.broadcast("user_logout");
  }

}

