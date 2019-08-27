/**
 * @flow
 */

import * as yup from 'yup';
import { INVALID_EMAIL, EMAIL_NOT_LONG_ENOUGH, PASSWORD_NOT_LONG_ENOUGH, REQUIRED_NAME } from './errorMessages';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string(EMAIL_NOT_LONG_ENOUGH)
    .min(3)
    .max(255)
    .email(INVALID_EMAIL),
  password: yup
    .string(PASSWORD_NOT_LONG_ENOUGH)
    .min(3)
    .max(255),
});

export const registerValidationSchema = yup.object().shape({
  email: yup
    .string(EMAIL_NOT_LONG_ENOUGH)
    .min(3)
    .max(255)
    .email(INVALID_EMAIL),
  password: yup
    .string(PASSWORD_NOT_LONG_ENOUGH)
    .min(3)
    .max(255),
  name: yup.string().required(REQUIRED_NAME),
});
