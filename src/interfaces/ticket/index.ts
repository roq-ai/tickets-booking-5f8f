import { BookingInterface } from 'interfaces/booking';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface TicketInterface {
  id?: string;
  ticket_type: string;
  price: number;
  departure_time: any;
  arrival_time: any;
  origin: string;
  destination: string;
  provider_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  provider?: ProviderInterface;
  _count?: {
    booking?: number;
  };
}

export interface TicketGetQueryInterface extends GetQueryInterface {
  id?: string;
  ticket_type?: string;
  origin?: string;
  destination?: string;
  provider_id?: string;
}
