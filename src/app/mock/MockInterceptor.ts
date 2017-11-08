import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {projects} from "./data/projects";
import {profileCurrent} from "./data/profile-current";
import {project} from "./data/project";
import {runners} from "./data/runners";
import {builds} from "./data/builds";
import {qaBuilds} from "./data/qa-builds";
import {instances} from "./data/instances";
import {projectParams} from "./data/params";
/**
 * Created by rkhabibullin on 16.10.2017.
 */


export class MockInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = new URL(req.url);
        console.log('requesting '+req.method+' '+url.pathname);
        switch(url.pathname){
            case "/profile/current":
                return this.response(profileCurrent);
            case "/projects":
                return this.response(projects);
            case "/login":
                return this.response(null, 200, {"Authorization":"Bearer test-token"});
            case "/projects/test-service":
                return this.response(project);
            case "/runners":
                return this.response(runners);
            case "/projects/17/builds":
                return this.response(builds);
            case "/projects/17/qa-builds":
                return this.response(qaBuilds);
            case "/projects/17/instances":
                return this.response(instances);
            case "/projects/17/params":
                return this.response(projectParams);
            default:
                console.log("requested unknown url "+url.pathname);
                return this.response(null, 404);
        }
    }

    private response(body?:any, status:number = 200, headers?:any):Observable<HttpEvent<any>>{
        return Observable.of(new HttpResponse({body, status, headers}));
    }
}