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
  DRIVER_EMPLOYMENT = "driverEmployment",
  DRIVER_GENDER = "driverGender",
  DRIVER_LOCATION = "driverLocation",
  DRIVER_MARITAL_STATUS = "driverMaritalStatus",
  MONTH = "month",
  VEHICLE_MODEL = "vehicleModel",
  YEAR = "year",
}

export type GetPolicyFilters = Partial<
  Record<
    | GetPolicyFilterKey.DRIVER_EMPLOYMENT
    | GetPolicyFilterKey.DRIVER_GENDER
    | GetPolicyFilterKey.DRIVER_LOCATION
    | GetPolicyFilterKey.DRIVER_MARITAL_STATUS
    | GetPolicyFilterKey.MONTH
    | GetPolicyFilterKey.VEHICLE_MODEL
    | GetPolicyFilterKey.YEAR,
    OrUndefined<string>
  >
>;

export interface IReadDataArgs {
  filters?: GetPolicyFilters;
  pageSize: number;
  skip: number;
}

export interface IReadDataResult {
  policies: OrNull<Array<IPolicy>>;
  skipBack: OrNull<number>;
  skipForward: OrNull<number>;
}

export interface IReadDatumArgs {
  row: number;
}

export interface IReadDatumResult {
  policy: OrNull<IPolicy>;
}

export const latestYear = new Date().getFullYear();

export const earliestYear = latestYear - 100;
