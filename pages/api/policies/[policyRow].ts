import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponseJson, IGetPolicyResult } from "~/types";
import { getPolicyAsync, withErrorHandling } from "~/utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseJson<IGetPolicyResult>>
) {
  return withErrorHandling<IGetPolicyRequest, IGetPolicyResult>({
    method: `GET`,
    req,
    res,
    isValidRequest,
    async callback({ query }) {
      return res.status(200).json({
        data: await getPolicyAsync({ row: parseInt(query.policyRow) }),
      });
    },
  });
}

interface IGetPolicyRequest extends NextApiRequest {
  query: {
    policyRow: string;
  };
}

function isValidRequest(req: NextApiRequest): req is IGetPolicyRequest {
  let { query } = req;

  return typeof query?.policyRow === `string` && parseInt(query?.policyRow) > 0;
}
