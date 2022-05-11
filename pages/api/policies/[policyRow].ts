import type { NextApiRequest, NextApiResponse } from "next";
import { getPolicyAsync, withErrorHandling } from "~/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withErrorHandling({
    method: `GET`,
    req,
    res,
    isValidRequest,
    async callback({ body }) {
      return res.status(200).json({
        data: await getPolicyAsync(body.row),
      });
    },
  });
}

interface IGetPolicyRequest extends NextApiRequest {
  body: {
    row: number;
  };
}

function isValidRequest(req: NextApiRequest): req is IGetPolicyRequest {
  let { body } = req;

  if (typeof body === `string`) {
    body = JSON.parse(body);
  }

  return typeof body?.row === `number`;
}
