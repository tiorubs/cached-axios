import { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
export interface CacheInterface {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
    del: (key: string) => void;
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
}
