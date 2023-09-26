import * as yup from 'yup';

export const ticketValidationSchema = yup.object().shape({
  ticket_type: yup.string().required(),
  price: yup.number().integer().required(),
  departure_time: yup.date().required(),
  arrival_time: yup.date().required(),
  origin: yup.string().required(),
  destination: yup.string().required(),
  provider_id: yup.string().nullable().required(),
});
