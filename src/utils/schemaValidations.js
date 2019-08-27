/**
 * @flow
 */

import * as yup from 'yup';
import {
  INVALID_EMAIL,
  EMAIL_NOT_LONG_ENOUGH,
  PASSWORD_NOT_LONG_ENOUGH,
  REQUIRED_NAME,
  TITLE_NOT_LONG_ENOUGH,
  REQUIRED_TITLE,
  DESCRIPTION_NOT_LONG_ENOUGH,
  REQUIRED_DESCRIPTION,
  AUTHOR_NOT_LONG_ENOUGH,
  REQUIRED_AUTHOR,
  REQUIRED_PRICE,
  REQUIRED_PAGES,
  IMAGE_NOT_LONG_ENOUGH,
  REQUIRED_IMAGE,
  PURCHASE_URL_NOT_LONG_ENOUGH,
  REQUIRED_PURCHASE_URL,
} from './errorMessages';

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

export const bookAddValidationSchema = yup.object().shape({
  title: yup
    .string(TITLE_NOT_LONG_ENOUGH)
    .min(3)
    .required(REQUIRED_TITLE),
  description: yup
    .string(DESCRIPTION_NOT_LONG_ENOUGH)
    .min(3)
    .required(REQUIRED_DESCRIPTION),
  author: yup
    .string(AUTHOR_NOT_LONG_ENOUGH)
    .min(3)
    .required(REQUIRED_AUTHOR),
  image: yup
    .string(IMAGE_NOT_LONG_ENOUGH)
    .min(3)
    .required(REQUIRED_IMAGE),
  price: yup.string().required(REQUIRED_PRICE),
  pages: yup.string().required(REQUIRED_PAGES),
  purchaseUrl: yup
    .string(PURCHASE_URL_NOT_LONG_ENOUGH)
    .min(3)
    .required(REQUIRED_PURCHASE_URL),
});
