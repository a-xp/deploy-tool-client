import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";

@Injectable()
export class AuthenticationService {

  public user:User;
  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.post('http://localhost:9000/login', { username: username, password: password })
        .map((response: Response) => {
          if(response.headers.has("Authorization")){
            let token = response.headers.getAll("Authorization")[0];
            localStorage.setItem('currentToken', token);
            return token;
          }
          throw "Failed to authorize";
        });
  }

  loadProfile() {

  }

  logout() {
    localStorage.removeItem('currentToken');
  }

}

export class User {
  public login: string;
  public rights: Array<string>;
  public token: string;
}