import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  name: yup.string().required(),
  contact_number: yup.string().required(),
  position: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
