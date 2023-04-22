import { PrismaClient } from '@prisma/client';
import express from 'express';
import Joi from 'joi';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type PageParams } from '@/@types';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';

const prisma = new PrismaClient();

const app = express();

// GET /contacts - Get all contacts
app.get('/contacts', async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword, page = 1, size = DEFAULT_PAGE_SIZE } = req.query as PageParams;

  const skip = (page - 1) * size;

  const where = keyword
    ? { OR: [{ full_name: { contains: keyword } }, { email: { contains: keyword } }] }
    : {};

  const contacts = await prisma.contact.findMany({
    where,
    skip,
    take: size,
    orderBy: [{ full_name: 'asc' }],
  });

  const count = await prisma.contact.count({ where });
  const totalPages = Math.ceil(count / size);
  const currentPage = Number(page);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  res.json({
    data: contacts,
    meta: {
      currentPage,
      hasNextPage,
      hasPreviousPage,
      totalPages,
      totalItems: count,
    },
  });
});

export default app;
