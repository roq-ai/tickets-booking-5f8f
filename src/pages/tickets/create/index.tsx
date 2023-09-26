import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createTicket } from 'apiSdk/tickets';
import { ticketValidationSchema } from 'validationSchema/tickets';
import { ProviderInterface } from 'interfaces/provider';
import { getProviders } from 'apiSdk/providers';
import { TicketInterface } from 'interfaces/ticket';

function TicketCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TicketInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTicket(values);
      resetForm();
      router.push('/tickets');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TicketInterface>({
    initialValues: {
      ticket_type: '',
      price: 0,
      departure_time: new Date(new Date().toDateString()),
      arrival_time: new Date(new Date().toDateString()),
      origin: '',
      destination: '',
      provider_id: (router.query.provider_id as string) ?? null,
    },
    validationSchema: ticketValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Tickets',
              link: '/tickets',
            },
            {
              label: 'Create Ticket',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ticket
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.ticket_type}
            label={'Ticket Type'}
            props={{
              name: 'ticket_type',
              placeholder: 'Ticket Type',
              value: formik.values?.ticket_type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Price"
            formControlProps={{
              id: 'price',
              isInvalid: !!formik.errors?.price,
            }}
            name="price"
            error={formik.errors?.price}
            value={formik.values?.price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="departure_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Departure Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.departure_time ? new Date(formik.values?.departure_time) : null}
              onChange={(value: Date) => formik.setFieldValue('departure_time', value)}
            />
          </FormControl>
          <FormControl id="arrival_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Arrival Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.arrival_time ? new Date(formik.values?.arrival_time) : null}
              onChange={(value: Date) => formik.setFieldValue('arrival_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.origin}
            label={'Origin'}
            props={{
              name: 'origin',
              placeholder: 'Origin',
              value: formik.values?.origin,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.destination}
            label={'Destination'}
            props={{
              name: 'destination',
              placeholder: 'Destination',
              value: formik.values?.destination,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ProviderInterface>
            formik={formik}
            name={'provider_id'}
            label={'Select Provider'}
            placeholder={'Select Provider'}
            fetcher={getProviders}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/tickets')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'ticket',
    operation: AccessOperationEnum.CREATE,
  }),
)(TicketCreatePage);
