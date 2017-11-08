import {User} from "./data/User";
import {Project} from "./data/Project";
import {Runner} from "../runner.service";
/**
 * Created by rkhabibullin on 18.10.2017.
 */


export interface AppStore{
    projects: Project[],
    user: User,
    runners: Runner[],
    currentProject: number|null
}