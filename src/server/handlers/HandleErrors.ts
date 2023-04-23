import { type NextApiResponse } from 'next';
import { type ValidationError } from 'yup';

function mapValidationError(errorObj: ValidationError) {
  const errors = {};

  errorObj.inner.forEach((err) => {
    const { path, message } = err;
    errors[path] = message;
  });

  return {
    name: errorObj.name,
    message: `${errorObj.errors.length} errors found`,
    errors,
  };
}

export default function HandleErrors(error, res: NextApiResponse) {
  // Handle Validation errors
  if (error.name === 'ValidationError') {
    return res.status(422).json(mapValidationError(error));
  }

  // Handle Prisma errors
  if (error.code && /^P\d{4}$/.test(error.code)) {
    switch (error.code) {
      case 'P2002':
        return res.status(400).json({
          message: `Duplicate unique key violation (${error.code})`,
        });
      case 'P2016':
        return res.status(400).json({
          message: `Invalid data provided (${error.code})`,
        });
      case 'P2025':
        return res.status(400).json({
          message: `Required field is missing (${error.code})`,
        });
      case 'P2027':
        return res.status(404).json({
          message: `Record not found (${error.code})`,
        });
      case 'P1010':
        return res.status(500).json({
          message: `Failed to initialize Prisma (${error.code})`,
        });
      default:
        return res.status(500).json({
          message: `Sorry, there was an error processing your request.\nPlease try again later. (${error.code})`,
        });
    }
  }

  // Handle database connection errors
  if (error.message && /connect ECONNREFUSED/.test(error.message)) {
    return res.status(500).json({
      message: `Failed to connect to the database server.\nPlease try again later. (${error.code})`,
    });
  }

  // Handle any other errors
  res.status(error.isExpected ? 400 : 500).json({
    ...error,
    message: error.message || 'Sorry, there was an unexpected error.\nPlease try again later.',
  });
}
