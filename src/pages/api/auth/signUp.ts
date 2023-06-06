import type { NextApiRequest, NextApiResponse } from 'next';

import { endpoints } from '@REST/endpoints';
import { handleRequest } from '@utils/apiHandler';

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await handleRequest(req, res, {
    endpoint: endpoints.SIGN_UP,
    allowedMethods: ['POST'],
  });
}
