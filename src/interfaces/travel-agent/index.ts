import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TravelAgentInterface {
  id?: string;
  name: string;
  contact_number: string;
  address: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TravelAgentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  contact_number?: string;
  address?: string;
  user_id?: string;
}
