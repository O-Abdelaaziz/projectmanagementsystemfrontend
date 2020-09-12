import { ProjectStatus } from './project-status';
import { Project } from './project';

export class ProjectIssues {
    id:number
    uid:string;
    description:string
    dateCreation:string;
    status=new ProjectStatus();
    project=new Project();
}
