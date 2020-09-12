import { User } from './user';

export class UserProfile {
  id: number;
  uid: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  address: string;
  city: string;
  street: string;
  postal_code: string;
  skills: string;
  facebook_acount: string;
  twitter_acount: string;
  linkedin_acount: string;
  youtube_acount:string;
  portfolio :string;
  education: string;
  urlImage: string;
  notes: string;

  user = new User();
}
