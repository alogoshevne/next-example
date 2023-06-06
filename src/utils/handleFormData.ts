import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatus } from '@setup/typedefs';
import { Data, handleRequest } from '@utils/apiHandler';
import { ImageFields, optimizeImages } from '@utils/optimizeImages';

export async function handleFormData(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  endpoint: string,
  imageFields: ImageFields,
) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Error parsing form data' });

      return;
    }
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);

    if (boundaryMatch) {
      const boundary = boundaryMatch[1] || boundaryMatch[2];
      const headers = {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      };
      // Optimize images recursively
      await optimizeImages(fields, files, imageFields);

      req.body = fields;
      await handleRequest(req, res, {
        endpoint: endpoint,
        allowedMethods: ['POST'],
        customHeaders: headers,
      });
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Error parsing form data' });
    }
  });
}
