/**
 * Created by rkhabibullin on 08.11.2017.
 */


export class Instance{
    public version: string;
    public pid:number;
    public server:string;
    public port:number;
    public uptime:number;

    public constructor(v:any){
        Object.assign(this,v);
    }

}