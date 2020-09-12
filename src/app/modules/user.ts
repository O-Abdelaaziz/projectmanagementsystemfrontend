import { Task } from './task';
import { UserProfile } from './user-profile';

export class User {
  id: number;
  uid: string;
  email: string;
  username: string;
  password: string;
  date_created: string;
  date_modified: string;
  time_modified_number: number;
  // isTokenExpired: boolean;
  // isAccountNonExpired: boolean;
  // isAccountNonLocked: boolean;
  // isCredentialsNonExpired: boolean;
  enabled: boolean;
  tasks :string;
}
