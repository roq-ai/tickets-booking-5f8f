import { UserInterface } from 'interfaces/user';
import { TicketInterface } from 'interfaces/ticket';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  booking_date: any;
  user_id: string;
  ticket_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  ticket?: TicketInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  ticket_id?: string;
}
