interface ErrorInterface {
  is_error: boolean;
  detail: DetailType[] | string;
}

export type DetailType = {
  email?: string[];
  password?: string[];
  departments?: string[];
  detail?: string;
};

export interface ResponseInterface<T> {
  error: ErrorInterface;
  data: T;
  code: number;
}
