import type { OrUndefined, OrNull, ApiResponseJson, ApiMethod } from "~/types";

export interface IUseAsyncRequestArgs {
  body?: OrUndefined<OrNull<BodyInit>>;
  endpoint: string;
  method?: ApiMethod;
  query?: string;
}

export async function asyncRequest<ReturnedDataType = undefined>({
  body,
  endpoint,
  method,
  query,
}: IUseAsyncRequestArgs): Promise<OrUndefined<ReturnedDataType>> {
  // * Create a new AbortController instance for this request
  const controller = new AbortController();

  const promise = fetch(
    `${window.location.origin}/api${endpoint}${query ?? ``}`,
    {
      body,
      headers: {
        [`Content-Type`]: `application/json`,
      },
      method,
      // * Pass the signal to the request
      signal: controller.signal,
    }
  );

  // * Cancel the request if the server cache calls the `promise.cancel` method
  // * This is the abort procedure specifically for React Query.
  // TODO: Update this if a different server cache is used
  //@ts-ignore
  promise.cancel = () => controller.abort();

  const response = await promise;

  const json = (await response.json()) as ApiResponseJson<ReturnedDataType>;

  if (json.error) {
    throw new Error(json.error);
  }

  return json.data;
}
