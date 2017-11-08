import {Injectable} from "@angular/core";
import {projectActions, ProjectEvent} from "../actions/projects";
import { Actions, Effect } from '@ngrx/effects';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Project} from "../data/Project";
import {HttpClient} from "@angular/common/http";
import {AppStore} from "../AppStore";
import {createSelector} from "@ngrx/store";
import {Instance} from "../data/Instance";
import {Build} from "../data/Build";
import {ProjectParams} from "../data/ProjectParams";
/**
 * Created by rkhabibullin on 18.10.2017.
 */


@Injectable()
export class ProjectEffects {

    constructor(private actions$: Actions, private http:HttpClient){}

    @Effect()
    loadList$ = this.actions$.ofType(projectActions.LOAD_LIST).throttleTime(30000)
        .switchMap(t=>this.http.get<Project[]>(environment.apiUrl+"/projects")
            .map(res=>({type: projectActions.LIST_LOADED, value: res.map(v=>new Project(v))}))
            .catch(err=>Observable.of({type: projectActions.LOAD_FAILED})));

    @Effect()
    loadInstances$ = this.actions$.ofType(projectActions.LOAD_INSTANCES)
        .switchMap((action:ProjectEvent)=>this.http.get<Instance[]>(environment.apiUrl+"/projects/"+action.projectId+"/instances")
            .map(res=>({type:projectActions.INSTANCES_LOADED, projectId: action.projectId, value: res.map(v=>new Instance(v))}))
            .catch(err=>Observable.of({type: projectActions.LOAD_FAILED})));

    @Effect()
    loadBuilds$ = this.actions$.ofType(projectActions.LOAD_BUILDS)
        .switchMap((action:ProjectEvent)=>this.http.get<Instance[]>(environment.apiUrl+"/projects/"+action.projectId+"/builds")
            .map(res=>({type:projectActions.BUILDS_LOADED, projectId: action.projectId, value: res.map(v=>new Build(v))}))
            .catch(err=>Observable.of({type: projectActions.LOAD_FAILED})));

    @Effect()
    loadQABuilds$ = this.actions$.ofType(projectActions.LOAD_QA_BUILDS)
        .switchMap((action:ProjectEvent)=>this.http.get<Instance[]>(environment.apiUrl+"/projects/"+action.projectId+"/qa-builds")
            .map(res=>({type:projectActions.QA_BUILDS_LOADED, projectId: action.projectId, value: res.map(v=>new Build(v))}))
            .catch(err=>Observable.of({type: projectActions.LOAD_FAILED})));

    @Effect()
    loadParams$ = this.actions$.ofType(projectActions.LOAD_PARAMS)
        .switchMap((action:ProjectEvent)=>this.http.get<Instance[]>(environment.apiUrl+"/projects/"+action.projectId+"/params")
            .map(res=>({type:projectActions.PARAMS_LOADED, projectId: action.projectId, value: new ProjectParams(res)}))
            .catch(err=>Observable.of({type: projectActions.LOAD_FAILED})));

    @Effect()
    saveParams$ = this.actions$.ofType(projectActions.SAVE_PARAMS)
        .switchMap((action:ProjectEvent)=>this.http.post(environment.apiUrl+"/projects/"+action.projectId+"/params", action.value))
        .map((action:ProjectEvent)=>({type: projectActions.LOAD_PARAMS, projectId: action.projectId}));

    public static projectReducer(state: Project[], action: ProjectEvent) {
        switch (action.type) {
            case projectActions.LIST_LOADED: return  action.value;
            case projectActions.BUILDS_LOADED: return setProjectProperty(state, action.projectId, 'builds', action.value);
            case projectActions.INSTANCES_LOADED: return setProjectProperty(state, action.projectId, 'instances', action.value);
            case projectActions.PARAMS_LOADED: return setProjectProperty(state, action.projectId, 'params', action.value);
            case projectActions.QA_BUILDS_LOADED: return setProjectProperty(state, action.projectId, 'qaBuilds', action.value);
            default:
                return state;
        }
    }

}

function setProjectProperty(state:Project[], projectId:number, prop:string, value:any){
    let project = Object.assign({}, state.find(p=>p.id==projectId), {[prop]:value});
    return [project, ...state.filter(p=>p.id!=projectId)];
}

export const selectProjects = (state:AppStore) => state.projects;
export const selectCurrentProjectId = (state:AppStore) => state.currentProject;
export const selectCurrentProject = createSelector(selectCurrentProjectId, selectProjects, (projectId, projects)=>{
    if(projects && projectId){
        return projects.find((p)=>p.id==projectId);
    }else{
        return null;
    }
});