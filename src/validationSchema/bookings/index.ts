import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  booking_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  ticket_id: yup.string().nullable().required(),
});
