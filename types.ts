export type OrNull<Type> = Type | null;

export type OrUndefined<Type> = Type | undefined;

export type ResolvedPromise<Type extends Promise<unknown>> =
  Type extends Promise<infer ResolvedType> ? ResolvedType : never;

export type ApiCacheResponse<Data> = {
  data: OrUndefined<Data>;
  error: OrNull<Error>;
  loading: boolean;
};

export type ApiMethod = `DELETE` | `GET` | `PATCH` | `POST` | `PUT`;

export type ApiResponseJson<Data = undefined> = {
  data?: Data;
  error?: string;
};

export enum DriverEmployment {
  EMPLOYED = "EMPLOYED",
  HOMEMAKER = "HOMEMAKER",
  OTHER_EMP = "OTHER_EMP",
  RETIRED = "RETIRED",
  STUDENT = "STUDENT",
  UNEMPLOYED = "UNEMPLOYED",
}

export enum DriverGender {
  FEMALE = "Female",
  MALE = "Male",
}

export enum DriverLocation {
  RURAL = "Rural",
  SUBURBAN = "Suburban",
  URBAN = "Urban",
}

export enum DriverMaritalStatus {
  MARRIED = "Married",
  SINGLE = "Single",
}

export enum VehicleModel {
  COUPE_CABRIOLET = "COUPE_CABRIOLET",
  HATCHBACK = "HATCHBACK",
  OTHER_MODEL = "OTHER_MODEL",
  PICKUP = "PICKUP",
  SEDAN = "SEDAN",
  SUV = "SUV",
  VAN = "VAN",
}

export interface IPolicy {
  driverAge: number;
  driverGender: DriverGender;
  driverEmployment: DriverEmployment;
  driverLocation: DriverLocation;
  driverMaritalStatus: DriverMaritalStatus;
  insuranceClaims: number;
  insuranceLosses: number;
  insurancePremium: number;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  row: number;
  vehicleAge: number;
  vehicleModel: VehicleModel;
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
  [GetPolicyFilterKey.DRIVER_EMPLOYMENT]: DriverEmployment;
  [GetPolicyFilterKey.DRIVER_GENDER]: DriverGender;
  [GetPolicyFilterKey.DRIVER_LOCATION]: DriverLocation;
  [GetPolicyFilterKey.DRIVER_MARITAL_STATUS]: DriverMaritalStatus;
  [GetPolicyFilterKey.MONTH]: IPolicy[`month`];
  [GetPolicyFilterKey.VEHICLE_AGE]: number;
  [GetPolicyFilterKey.VEHICLE_MODEL]: VehicleModel;
  [GetPolicyFilterKey.YEAR]: number;
}>;
