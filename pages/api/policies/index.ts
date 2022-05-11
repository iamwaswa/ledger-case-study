import type { NextApiRequest, NextApiResponse } from "next";
import { IReadDataArgs, withErrorHandling } from "~/utils";
import { getPoliciesAsync } from "~/utils";

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
        data: await getPoliciesAsync(body),
      });
    },
  });
}

interface IGetPoliciesRequest extends NextApiRequest {
  body: IReadDataArgs;
}

function isValidRequest(req: NextApiRequest): req is IGetPoliciesRequest {
  let { body } = req;

  if (typeof body === `string`) {
    body = JSON.parse(body);
  }

  return (
    typeof body?.pageSize === `number` &&
    typeof body?.skip === `number` &&
    [`undefined`, `number`].includes(typeof body?.filters.driverAge) &&
    [`undefined`, `string`].includes(typeof body?.filters.driverGender) &&
    [`undefined`, `string`].includes(typeof body?.filters.driverEmployment) &&
    [`undefined`, `string`].includes(typeof body?.filters.driverLocation) &&
    [`undefined`, `string`].includes(
      typeof body?.filters.driverMaritalStatus
    ) &&
    [`undefined`, `number`].includes(typeof body?.filters.month) &&
    [`undefined`, `number`].includes(typeof body?.filters.vehicleAge) &&
    [`undefined`, `string`].includes(typeof body?.filters.vehicleModel) &&
    [`undefined`, `number`].includes(typeof body?.filters.year)
  );
}
