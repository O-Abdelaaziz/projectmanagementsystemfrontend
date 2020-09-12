import { Customer } from './customer';
import { ProjectStatus } from './project-status';

export class Project {
  id: number;
  uid: string;
  name: string;
  description: string;
  dateCreation: string;
  dateEnd: string;
  price: number;
  client=new Customer();
  status=new ProjectStatus();
}
