import type {
  BasicPolicy,
  IPolicy,
  IGetPoliciesArgs,
  IGetPoliciesResult,
  IGetPolicyArgs,
  IGetPolicyResult,
  OrUndefined,
} from "~/types";
import {
  DriverEmployment,
  DriverGender,
  DriverLocation,
  DriverMaritalStatus,
  earliestYear,
  latestYear,
  VehicleModel,
} from "~/types";
import { readCSVFile } from "~/utils/server";

export async function getPoliciesAsync({
  filters,
  pageSize,
  skip,
}: IGetPoliciesArgs): Promise<IGetPoliciesResult> {
  const policies = readCSVFile().map(
    ({
      driverEmployment,
      driverGender,
      driverLocation,
      driverMaritalStatus,
      month,
      row,
      vehicleModel,
      year,
    }: IPolicy): BasicPolicy => {
      return {
        driverEmployment,
        driverGender,
        driverLocation,
        driverMaritalStatus,
        month,
        row,
        vehicleModel,
        year,
      };
    }
  );

  const formattedFilters = formatFilters(filters);

  const matchingPoliciesPlus1 = policies
    .filter(
      matchingValues(`driverEmployment`, formattedFilters?.driverEmployment)
    )
    .filter(matchingValues(`driverGender`, formattedFilters?.driverGender))
    .filter(matchingValues(`driverLocation`, formattedFilters?.driverLocation))
    .filter(
      matchingValues(
        `driverMaritalStatus`,
        formattedFilters?.driverMaritalStatus
      )
    )
    .filter(matchingValues(`month`, formattedFilters?.month))
    .filter(matchingValues(`vehicleModel`, formattedFilters?.vehicleModel))
    .filter(matchingValues(`year`, formattedFilters?.year))
    .slice(skip, skip + pageSize + 1);

  const matchingPolicies = matchingPoliciesPlus1.slice(0, pageSize);

  return {
    policies: matchingPolicies.length > 0 ? matchingPolicies : null,
    skipBack: skip === 0 ? null : skip - pageSize,
    skipForward:
      matchingPoliciesPlus1.slice(pageSize).length > 0 ? skip + pageSize : null,
  };
}

function formatFilters(
  filters: IGetPoliciesArgs[`filters`]
): Pick<
  IPolicy,
  | `driverEmployment`
  | `driverGender`
  | `driverLocation`
  | `driverMaritalStatus`
  | `month`
  | `vehicleModel`
  | `year`
> {
  const driverEmployment = Object.values(DriverEmployment).find(
    (value) => value === filters?.driverEmployment
  );

  const driverGender = Object.values(DriverGender).find(
    (value) => value === filters?.driverGender
  );

  const driverLocation = Object.values(DriverLocation).find(
    (value) => value === filters?.driverLocation
  );

  const driverMaritalStatus = Object.values(DriverMaritalStatus).find(
    (value) => value === filters?.driverMaritalStatus
  );

  const month = filters?.month ? Number(filters.month) : undefined;

  const vehicleModel = Object.values(VehicleModel).find(
    (value) => value === filters?.vehicleModel
  );

  const year = filters?.year ? Number(filters.year) : undefined;

  return {
    driverEmployment,
    driverGender,
    driverLocation,
    driverMaritalStatus,
    month: month >= 1 && month <= 12 ? (month as IPolicy[`month`]) : undefined,
    vehicleModel,
    year: year >= earliestYear && year <= latestYear ? year : undefined,
  };
}

function matchingValues<FilterType extends keyof IPolicy>(
  key: FilterType,
  filter: OrUndefined<IPolicy[FilterType]>
) {
  return (policy: IPolicy, _: number, __: Array<IPolicy>): boolean => {
    return typeof filter === `undefined` || policy[key] === filter;
  };
}

export async function getPolicyAsync({
  row,
}: IGetPolicyArgs): Promise<IGetPolicyResult> {
  const policies = readCSVFile();

  const [matchingPolicy] = policies.slice(row - 1, row);

  return {
    policy: matchingPolicy ?? null,
  };
}
