import { type PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { type NextApiResponse } from 'next';
import { type ValidationError } from 'yup';

import ServerError from '@/lib/errors/ServerError';

function mapValidationError(errorObj: ValidationError) {
  const errors: Record<string, any> = {};

  errorObj.inner.forEach((err) => {
    const { path, message } = err;
    if (path?.length) {
      errors[path] = message;
    }
  });

  return {
    name: errorObj.name,
    message: `${errorObj.errors.length} errors found`,
    errors,
  };
}

export default function ErrorHandler(error: unknown, res: NextApiResponse) {
  // Handle Validation errors
  if ((error as ValidationError).name === 'ValidationError') {
    return res.status(422).json(mapValidationError(error as ValidationError));
  }

  // Handle Prisma errors
  if ((error as PrismaClientKnownRequestError).code) {
    const err = error as PrismaClientKnownRequestError;

    if (/^P\d{4}$/.test(err.code)) {
      switch (err.code) {
        case 'P2002':
          return res.status(400).json({
            message: `Duplicate unique key violation (${err.code})`,
          });
        case 'P2016':
          return res.status(400).json({
            message: `Invalid data provided (${err.code})`,
          });
        case 'P2025':
          return res.status(400).json({
            message: `Required field is missing (${err.code})`,
          });
        case 'P2027':
          return res.status(404).json({
            message: `Record not found (${err.code})`,
          });
        case 'P1010':
          return res.status(500).json({
            message: `Failed to initialize Prisma (${err.code})`,
          });
        default:
          return res.status(500).json({
            message: `Sorry, there was an error processing your request.\nPlease try again later. (${err.code})`,
          });
      }
    }

    return res.status(500).json({
      message: `Sorry, there was an error processing your request.\nPlease try again later`,
    });
  }

  // Handle database connection errors
  if (error instanceof ServerError) {
    return res.status(error.isExpected ? 400 : 500).json({
      message: error.message,
    });
  }

  if (error instanceof Error) {
    // Handle database connection errors
    if (error.message && /connect ECONNREFUSED/.test(error.message)) {
      return res.status(500).json({
        message: 'Failed to connect to the database server.\nPlease try again later',
      });
    }

    if (error.message) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // Handle any other errors
  res.status(500).json({
    message: 'Sorry, there was an unexpected error.\nPlease try again later.',
  });
}
