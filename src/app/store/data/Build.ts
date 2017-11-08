/**
 * Created by rkhabibullin on 08.11.2017.
 */

export class Build {

    public version: string;
    public pipelineId: number;
    public env: string;
    public date: number;
    public author: string;
    public message:string;
    public features:Array<Task>;
    public flags:Array<string>;

    constructor(json:any) {
        Object.assign(this, json);
    }
}

export class Task {
    constructor(public id:number, public name:string){ };
}