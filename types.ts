export type OrNull<Type> = Type | null;

export type OrUndefined<Type> = Type | undefined;

export interface IPolicy {
  driverAge: number;
  driverGender: string;
  driverEmployment: string;
  driverLocation: string;
  driverMaritalStatus: string;
  insuranceClaims: number;
  insuranceLosses: number;
  insurancePremium: number;
  month: number;
  vehicleAge: number;
  vehicleModel: string;
  year: number;
}

export enum GetPolicyFilterKey {
  DRIVER_AGE = "driverAge",
  DRIVER_EMPLOYMENT = "driverEmployment",
  DRIVER_GENDER = "driverGender",
  DRIVER_LOCATION = "driverLocation",
  DRIVER_MARITAL_STATUS = "driverMaritalStatus",
  MONTH = "month",
  VEHICLE_AGE = "vehicleAge",
  VEHICLE_MODEL = "vehicleModel",
  YEAR = "year",
}

export type GetPolicyFilters = Partial<{
  [GetPolicyFilterKey.DRIVER_AGE]: number;
  [GetPolicyFilterKey.DRIVER_GENDER]: string;
  [GetPolicyFilterKey.DRIVER_EMPLOYMENT]: string;
  [GetPolicyFilterKey.DRIVER_LOCATION]: string;
  [GetPolicyFilterKey.DRIVER_MARITAL_STATUS]: string;
  [GetPolicyFilterKey.MONTH]: number;
  [GetPolicyFilterKey.VEHICLE_AGE]: number;
  [GetPolicyFilterKey.VEHICLE_MODEL]: string;
  [GetPolicyFilterKey.YEAR]: number;
}>;
