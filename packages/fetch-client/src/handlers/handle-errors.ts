import { publish } from "@uxland/event-aggregator";

export const INVALID_CREDENTIALS_EVENT = "UXL-FETCH:INVALID_CREDENTIALS_EVENT";
export const INVALID_REQUEST_EVENT = "UXL-FETCH:INVALID_REQUEST_EVENT";

export const handleErrors = async (
  response: Response
): Promise<Response | never> => {
  const microTask = (): Promise<void> => new Promise((resolve) => resolve());
  if (!response.ok) {
    let error;
    try {
      const data = await response.json();
      error = {
        ...new Error(),
        data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (e) {
      error = {
        ...new Error(),
        status: response.status,
        statusText: response.statusText,
      };
    }

    if (response.status === 401) {
      await microTask();
      publish(INVALID_CREDENTIALS_EVENT, error);
    } else {
      await microTask();
      publish(INVALID_REQUEST_EVENT, error);
    }
    throw error;
  }
  return response;
};
