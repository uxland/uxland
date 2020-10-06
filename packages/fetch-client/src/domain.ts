export type QueryParams = { [key: string]: any };

export type ResponseHandler = <T>(response) => T;

export interface Configuration {
  headers?: any;
  credentials?: string;
  mode: string;
}
