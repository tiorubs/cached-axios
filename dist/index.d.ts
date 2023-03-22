import { CachedAxiosConfig, CacheInterface, ICachedAxios } from "./types";
export declare function CachedAxios<T>(config: CachedAxiosConfig<T>, cache?: CacheInterface): ICachedAxios<T>;
