import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiMethod, ApiResponseJson } from "~/types";
import { strings } from "~/localization";

interface IWithErrorHandlerArgs<ValidRequest extends NextApiRequest, Data> {
  req: NextApiRequest;
  res: NextApiResponse<ApiResponseJson<Data>>;
  method: ApiMethod;
  isValidRequest: (req: NextApiRequest) => req is ValidRequest;
  callback: (req: ValidRequest) => Promise<void>;
}

export function withErrorHandling<ValidRequest extends NextApiRequest, Data>({
  req,
  res,
  method,
  isValidRequest,
  callback,
}: IWithErrorHandlerArgs<ValidRequest, Data>) {
  try {
    if (req.method?.toUpperCase() !== method) {
      return res.status(405).json({
        error: strings.apiMethodNotAllowed,
      });
    }
    if (isValidRequest(req)) {
      return callback(req);
    } else {
      throw new Error(strings.internalServerErrorMessage);
    }
  } catch (e: unknown) {
    let error = strings.internalServerErrorMessage;

    if (e instanceof Error) {
      error = e.message;
    }

    return res.status(500).json({
      error,
    });
  }
}
