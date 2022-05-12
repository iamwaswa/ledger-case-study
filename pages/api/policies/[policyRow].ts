import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseJson } from "~/types";
import type { IReadDatumResult } from "~/utils";
import { getPolicyAsync, withErrorHandling } from "~/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseJson<IReadDatumResult>>
) {
  return withErrorHandling<IGetPolicyRequest, IReadDatumResult>({
    method: `GET`,
    req,
    res,
    isValidRequest,
    async callback({ query }) {
      return res.status(200).json({
        data: await getPolicyAsync({ row: parseInt(query.row) }),
      });
    },
  });
}

interface IGetPolicyRequest extends NextApiRequest {
  query: {
    row: string;
  };
}

function isValidRequest(req: NextApiRequest): req is IGetPolicyRequest {
  let { query } = req;

  return typeof query?.row === `string` && parseInt(query?.row) > 0;
}
