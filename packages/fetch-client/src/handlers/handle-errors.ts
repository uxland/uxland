import { publish } from "@uxland/event-aggregator";
import { AxiosResponse } from "axios";

/**
 * Event indicating that credentials are invalid
 * @memberof FetchClient
 * @since v1.0.0
 * @param {string} INVALID_CREDENTIALS_EVENT='UXL-FETCH:INVALID_CREDENTIALS_EVENT'
 */
export const INVALID_CREDENTIALS_EVENT = "UXL-FETCH:INVALID_CREDENTIALS_EVENT";

/**
 * Event indicating that fetch has failed
 * @memberof FetchClient
 * @since v1.0.0
 * @param {string} INVALID_REQUEST_EVENT='UXL-FETCH:INVALID_REQUEST_EVENT'
 */
export const INVALID_REQUEST_EVENT = "UXL-FETCH:INVALID_REQUEST_EVENT";

export const handleErrors = async (
  response: AxiosResponse
): Promise<Response | never> => {
  const microTask = (): Promise<void> => new Promise((resolve) => resolve());
  const error = {
    ...new Error(),
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };

  if (response.status === 401) {
    await microTask();
    publish(INVALID_CREDENTIALS_EVENT, error);
  } else {
    await microTask();
    publish(INVALID_REQUEST_EVENT, error);
  }
  throw error;
};
