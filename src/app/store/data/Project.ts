import {ProjectParams} from "./ProjectParams";
import {Build} from "./Build";
import {Instance} from "./Instance";

/**
 * Created by rkhabibullin on 18.10.2017.
 */

export class Project{
    id:number;
    name:string;
    code:string;
    description:string;
    type:string;
    params: ProjectParams;
    builds: Build[] = [];
    qaBuilds: Build[] = [];
    instances: Instance[] = [];

    constructor(json){
        Object.assign(this, json);
    }
}