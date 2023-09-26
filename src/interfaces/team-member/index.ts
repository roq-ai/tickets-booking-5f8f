import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  name: string;
  contact_number: string;
  position: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  contact_number?: string;
  position?: string;
  user_id?: string;
}
