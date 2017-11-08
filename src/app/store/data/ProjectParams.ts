/**
 * Created by rkhabibullin on 07.11.2017.
 */

export class ProjectParams{
    mem: number;
    defaultVersion: string;
    additionalArgs: string;
    autoRun: boolean;
    autoReload: boolean;

    constructor(json:any) {
        Object.assign(this, json);
    }
}