import { Injectable } from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, Response, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthHttpService extends Http{

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.addJwt(options)).catch(this.handleError);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.addJwt(options)).catch(this.handleError);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.addJwt(options)).catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.addJwt(options)).catch(this.handleError);
  }

  // private helper methods

  private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
    // ensure request options and headers are not null
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    // add authorization header with jwt token
    let token  = localStorage.getItem('currentToken');
    if (token) {
      options.headers.append('Authorization', token);
    }

    return options;
  }

  private handleError(error: any) {
    if (error.status === 403) {
      window.location.href = '/login';
    }
    return Observable.throw(error._body);
  }

}
