import { AxiosResponse } from "axios";
import { ResponseHandler } from "../domain";

export const handleResponse = async <T>(
  response: AxiosResponse,
  handlers: ResponseHandler[] = []
): Promise<T> =>
  handlers.reduce(
    (previousValue, currentValue) => currentValue(previousValue),
    response.data
  );
