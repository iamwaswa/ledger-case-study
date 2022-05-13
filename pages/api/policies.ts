import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiResponseJson,
  GetPolicyFilterKey,
  IReadDataResult,
} from "~/types";
import {
  DriverEmployment,
  DriverGender,
  DriverLocation,
  DriverMaritalStatus,
  VehicleModel,
  earliestYear,
  latestYear,
} from "~/types";
import { getPoliciesAsync, withErrorHandling } from "~/utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseJson<IReadDataResult>>
) {
  return withErrorHandling<IGetPoliciesRequest, IReadDataResult>({
    method: `GET`,
    req,
    res,
    isValidRequest,
    async callback({ query: { pageSize, skip, ...query } }) {
      return res.status(200).json({
        data: await getPoliciesAsync({
          filters: query,
          pageSize: parseInt(pageSize),
          skip: parseInt(skip),
        }),
      });
    },
  });
}

interface IGetPoliciesRequest extends NextApiRequest {
  query: {
    pageSize: string;
    skip: string;
  } & Partial<Record<GetPolicyFilterKey, string>>;
}

function isValidRequest(req: NextApiRequest): req is IGetPoliciesRequest {
  let { query } = req;

  return (
    typeof query?.pageSize === `string` &&
    Number.parseInt(query.pageSize) >= 0 &&
    typeof query?.skip === `string` &&
    Number.parseInt(query.skip) >= 0 &&
    [undefined, ...Object.values(DriverGender)].includes(
      query?.driverGender as any
    ) &&
    [undefined, ...Object.values(DriverEmployment)].includes(
      query?.driverEmployment as any
    ) &&
    [undefined, ...Object.values(DriverLocation)].includes(
      query?.driverLocation as any
    ) &&
    [undefined, ...Object.values(DriverMaritalStatus)].includes(
      query?.driverMaritalStatus as any
    ) &&
    ((typeof query?.month === `string` &&
      Number.parseInt(String(query.month)) >= 1 &&
      Number.parseInt(String(query.month)) <= 12) ||
      typeof query?.month === `undefined`) &&
    [undefined, ...Object.values(VehicleModel)].includes(
      query?.vehicleModel as any
    ) &&
    ((typeof query?.year === `string` &&
      Number.parseInt(String(query.year)) >= earliestYear &&
      Number.parseInt(String(query.year)) <= latestYear) ||
      typeof query?.year === `undefined`)
  );
}
