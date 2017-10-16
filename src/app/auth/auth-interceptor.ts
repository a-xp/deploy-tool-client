import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
/**
 * Created by rkhabibullin on 16.10.2017.
 */


export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token  = localStorage.getItem('currentToken');
        if (token) {
            authReq = req.clone({headers: req.headers.set('Authorization', token)});
        }
        return next.handle(authReq).catch(err=>{
            if(err.status==403){
                location.href = "/login";
            }
            throw err;
        }) as Observable<HttpEvent<any>>;
    }
}