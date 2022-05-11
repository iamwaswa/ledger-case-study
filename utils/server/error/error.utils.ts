import type { NextApiRequest, NextApiResponse } from "next";
import { strings } from "~/localization";

interface IWithErrorHandlerArgs<ValidRequest extends NextApiRequest> {
  req: NextApiRequest;
  res: NextApiResponse;
  method: `DELETE` | `GET` | `PATCH` | `POST` | `PUT`;
  isValidRequest: (req: NextApiRequest) => req is ValidRequest;
  callback: (req: ValidRequest) => Promise<void>;
}

export function withErrorHandling<ValidRequest extends NextApiRequest>({
  req,
  res,
  method,
  isValidRequest,
  callback,
}: IWithErrorHandlerArgs<ValidRequest>) {
  try {
    if (req.method?.toLowerCase() !== method.toLowerCase()) {
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
