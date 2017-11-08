import {Injectable} from "@angular/core";
import {projectActions, ProjectEvent} from "../actions/projects";
import {Observable} from "rxjs";
import {uiActions, UiEvent} from "../actions/ui";
import { Actions, Effect } from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {AppStore} from "../AppStore";

/**
 * Created by rkhabibullin on 08.11.2017.
 */

@Injectable()
export class UiEffects {

    constructor(private actions$: Actions, private state: Store<AppStore>){}

    @Effect()
    loadProject$ = this.actions$.ofType(uiActions.PROJECT_VIEW)
        .distinctUntilChanged((o:UiEvent,n:UiEvent)=>o.value==n.value)
        .flatMap((action:UiEvent)=>
            Observable.of(
                {type: projectActions.LOAD_INSTANCES, projectId: action.value},
                {type: projectActions.LOAD_BUILDS, projectId: action.value},
                {type: projectActions.LOAD_QA_BUILDS, projectId: action.value},
                {type: projectActions.LOAD_PARAMS, projectId: action.value},
            ));

    @Effect()
    loadProjectByCode$ = this.actions$.ofType(uiActions.PROJECT_VIEW_CODE)
        .distinctUntilChanged((o:UiEvent,n:UiEvent)=>o.value==n.value)
        .flatMap((action:UiEvent)=>
            Observable.concat(
                Observable.of({type: projectActions.LOAD_LIST}),
                this.state.select('projects').filter(projects=>!!projects && !!projects.length)
                    .take(1).flatMap( projects => {
                    if(projects){
                        return Observable.of({type: uiActions.PROJECT_VIEW, value: projects.find(p=>p.code==action.value).id});
                    }else{
                        return Observable.empty()
                    }
                })
            ));

    public static uiReducer(state: number|null, action: UiEvent): number|null {
        switch(action.type){
            case uiActions.PROJECT_VIEW: return action.value;
            default:
                return state;
        }
    }

}