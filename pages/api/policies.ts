import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiResponseJson,
  GetPolicyFilters,
  IPolicy,
  IReadDataResult,
  OrUndefined,
} from "~/types";
import {
  DriverEmployment,
  DriverGender,
  DriverLocation,
  DriverMaritalStatus,
  VehicleModel,
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
    async callback({ query }) {
      return res.status(200).json({
        data: await getPoliciesAsync({
          filters: {
            driverAge:
              typeof query.driverAge === `undefined`
                ? undefined
                : parseFloat(query.driverAge),
            driverEmployment:
              query.driverEmployment as OrUndefined<DriverEmployment>,
            driverGender: query.driverGender as OrUndefined<DriverGender>,
            driverLocation: query.driverLocation as OrUndefined<DriverLocation>,
            driverMaritalStatus:
              query.driverMaritalStatus as OrUndefined<DriverMaritalStatus>,
            month:
              typeof query.month === `undefined`
                ? undefined
                : (parseInt(query.month) as IPolicy[`month`]),
            vehicleAge:
              typeof query.vehicleAge === `undefined`
                ? undefined
                : parseInt(query.vehicleAge),
            vehicleModel: query.vehicleModel as OrUndefined<VehicleModel>,
            year:
              typeof query.year === `undefined`
                ? undefined
                : parseInt(query.year),
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
    Number.parseInt(query.pageSize) >= 0 &&
    typeof query?.skip === `string` &&
    Number.parseInt(query.skip) >= 0 &&
    ((typeof query?.driverAge === `string` &&
      Number.parseInt(String(query.driverAge)) >= 0) ||
      typeof query?.driverAge === `undefined`) &&
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
    ((typeof query?.month === `string` &&
      Number.parseInt(String(query.month)) >= 1 &&
      Number.parseInt(String(query.month)) <= 12) ||
      typeof query?.month === `undefined`) &&
    ((typeof query?.vehicleAge === `string` &&
      Number.parseInt(String(query.vehicleAge)) >= 0) ||
      typeof query?.vehicleAge === `undefined`) &&
    [`undefined`, ...Object.values(VehicleModel)].includes(
      typeof query?.vehicleModel
    ) &&
    ((typeof query?.year === `string` &&
      Number.parseInt(String(query.year)) >= 0) ||
      typeof query?.year === `undefined`)
  );
}
