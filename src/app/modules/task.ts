import { User } from './user';
import { Category } from './category';
import { Project } from './project';

export class Task {
  id: number;
  uid: string;
  name: string;
  description: string;
  dateCreation: string;
  timeCreation: string;
  startDate: string;
  endDate: string;
  owner: string;
  isActivePasive: boolean;
  priority: string;
  progress: number;

  user = new User();
  project = new Project();
  statusCategory = new Category();
}
