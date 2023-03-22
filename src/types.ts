import { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

export interface CacheInterface {
  get: <T>(key: string) => T | Promise<T>;
  set: (key: string, value: any) => void | Promise<void>;
  del: (key: string) => void | Promise<void>;
  [x: string]: any;
}

export interface CachedAxiosConfig<T> extends AxiosRequestConfig<T> {
  cacheKey?: string;
  ttl?: number;
  status?: number;
  statusText?: string;
}

export interface CachedAxiosResponse<T, M> extends AxiosResponse<T, M> {
  config: CachedAxiosConfig<any>;
}

export interface ICachedAxios<T> extends AxiosInstance {
  (url: string, config: CachedAxiosConfig<T>): AxiosPromise<T>;
  deleteCache(cacheKey: string): void | Promise<void>;
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: CachedAxiosConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: CachedAxiosConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: CachedAxiosConfig<D>): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: CachedAxiosConfig<D>): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CachedAxiosConfig<D>
  ): Promise<R>;
}
