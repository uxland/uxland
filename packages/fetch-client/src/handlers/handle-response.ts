import { ResponseHandler } from "../domain";

const HEADER_CONTENT_TYPE = "Content-Type";
const CONTENT_TYPE_JSON = "application/json";

const isResponseContentTypeJSON = (response: Response): boolean => {
  const contentType = response.headers?.get(HEADER_CONTENT_TYPE);
  return contentType?.indexOf(CONTENT_TYPE_JSON) !== -1;
};

export const handleResponse = async <T>(
  response: Response,
  handlers: ResponseHandler[] = []
): Promise<T> =>
  isResponseContentTypeJSON(response)
    ? await response
        .json()
        .then((r) =>
          handlers.reduce(
            (previousValue, currentValue) => currentValue(previousValue),
            r
          )
        )
    : await response.text();
