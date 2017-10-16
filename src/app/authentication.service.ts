import {Injectable, OnInit} from '@angular/core';
import {Broadcaster} from "./broadcaster";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class AuthenticationService {
  readonly tokenKey = "currentToken";

  constructor(private http: HttpClient, private bus:Broadcaster) { }

  login(username: string, password: string) {
    return this.http.post<HttpResponse<void>>('http://localhost:9000/login', { username: username, password: password })
        .map((response)=>{
            if(response.headers.has("Authorization")){
                return response.headers.getAll("Authorization")[0];
            }
            throw {};
        }).catch(()=>{
            throw "Failed to authorize";
        }).do((token:string)=>{
            localStorage.setItem(this.tokenKey, token);
            this.bus.broadcast("user_login");
        });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.bus.broadcast("user_logout");
  }

}

