import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApiResponseJson,
  DriverEmployment,
  DriverGender,
  DriverLocation,
  DriverMaritalStatus,
  GetPolicyFilters,
  IPolicy,
  OrUndefined,
  VehicleModel,
} from "~/types";
import { IReadDataResult, withErrorHandling } from "~/utils";
import { getPoliciesAsync } from "~/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseJson<IReadDataResult>>
) {
  return withErrorHandling<IGetPoliciesRequest, IReadDataResult>({
    method: `GET`,
    req,
    res,
    isValidRequest,
    async callback({ query }) {
      return res.status(200).json({
        data: await getPoliciesAsync({
          filters: {
            driverAge: parseFloat(query.driverAge),
            driverEmployment:
              query.driverEmployment as OrUndefined<DriverEmployment>,
            driverGender: query.driverGender as OrUndefined<DriverGender>,
            driverLocation: query.driverLocation as OrUndefined<DriverLocation>,
            driverMaritalStatus:
              query.driverMaritalStatus as OrUndefined<DriverMaritalStatus>,
            month: parseInt(query.month) as IPolicy[`month`],
            vehicleAge: parseInt(query.vehicleAge),
            vehicleModel: query.vehicleModel as OrUndefined<VehicleModel>,
            year: parseInt(query.year),
          },
          pageSize: parseInt(query.pageSize),
          skip: parseInt(query.skip),
        }),
      });
    },
  });
}

interface IGetPoliciesRequest extends NextApiRequest {
  query: {
    pageSize: string;
    skip: string;
  } & Partial<Record<keyof GetPolicyFilters, string>>;
}

function isValidRequest(req: NextApiRequest): req is IGetPoliciesRequest {
  let { query } = req;

  return (
    typeof query?.pageSize === `string` &&
    Number.parseInt(query?.pageSize) >= 0 &&
    typeof query?.skip === `string` &&
    Number.parseInt(query?.skip) >= 0 &&
    [`undefined`, `string`].includes(typeof query?.driverAge) &&
    Number.parseInt(String(query?.driverAge)) >= 0 &&
    [`undefined`, ...Object.values(DriverGender)].includes(
      typeof query?.driverGender
    ) &&
    [`undefined`, ...Object.values(DriverEmployment)].includes(
      typeof query?.driverEmployment
    ) &&
    [`undefined`, ...Object.values(DriverLocation)].includes(
      typeof query?.driverLocation
    ) &&
    [`undefined`, ...Object.values(DriverMaritalStatus)].includes(
      typeof query?.driverMaritalStatus
    ) &&
    [`undefined`, `string`].includes(typeof query?.month) &&
    Number.parseInt(String(query?.month)) >= 1 &&
    Number.parseInt(String(query?.month)) <= 12 &&
    [`undefined`, `string`].includes(typeof query?.vehicleAge) &&
    Number.parseInt(String(query?.vehicleAge)) >= 0 &&
    [`undefined`, ...Object.values(VehicleModel)].includes(
      typeof query?.vehicleModel
    ) &&
    [`undefined`, `string`].includes(typeof query?.year) &&
    Number.parseInt(String(query?.year)) >= 0
  );
}
