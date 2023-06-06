// apiHandler.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

import { api } from '@REST/api';
import { HttpStatus } from '@setup/typedefs';

export type Data = {
  name?: string;
  error?: string;
};

export type RequestOptions = {
  endpoint: string;
  allowedMethods: string[];
  authorize?: boolean;
  customHeaders?: Record<string, string>;
};

function logoutAndRedirect(res: NextApiResponse) {
  destroyCookie({ res }, 'token', { path: '/' });
  res.setHeader('Location', '/sign-in');
  res.status(HttpStatus.FOUND).end();
}

export async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  options: RequestOptions,
) {
  try {
    if (!options.allowedMethods.includes(req.method!)) {
      res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .json({ error: 'Method not allowed' });

      return;
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method!) && !req.body) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Request body is missing' });

      return;
    }

    const headers: any = {
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      ...options.customHeaders,
    };

    if (options.authorize) {
      const token = parseCookies({ req })[process.env.AUTH_TOKEN_NAME];

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const requestOptions: any = {
      endpoint: options.endpoint,
      headers: headers,
      unsafe: true,
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method!)) {
      requestOptions.body = JSON.stringify(req.body);
    }

    const method = req.method!.toLowerCase() as keyof typeof api.server;
    const response = await api.server[method](requestOptions);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
      logoutAndRedirect(res);

      return;
    }

    if (response.status === HttpStatus.FORBIDDEN) {
      res.status(HttpStatus.FORBIDDEN).json({ error: 'Forbidden' });

      return;
    }

    if (!response.ok) {
      res.status(HttpStatus.SERVER_ERROR).json({ error: 'Server error' });

      return;
    }

    const json = await response.json();
    res.status(HttpStatus.OK).json(json.message);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: 'Server error' });
  }
}
