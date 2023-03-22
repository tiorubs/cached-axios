import axios from "axios";
import { MemoryCache } from "./memory-cache";

import { CachedAxiosConfig, CacheInterface, CachedAxiosResponse, ICachedAxios } from "./types";

const DEFAULT_TTL = 10 * 60 * 1000;

export function CachedAxios<T>(config: CachedAxiosConfig<T>, cache: CacheInterface = new MemoryCache()) {
  const api = axios.create(config) as ICachedAxios<T>;

  api.interceptors.request.use(
    async (request: CachedAxiosConfig<T>) => {
      if (!request.cacheKey) return request;

      const cachedResponse = await cache.get<any>(request.cacheKey);

      if (!cachedResponse) return request;

      if (cachedResponse.validity < Date.now()) {
        await cache.del(request.cacheKey);
        return request;
      }

      cachedResponse.__cached = true;

      request.data = cachedResponse;

      request.adapter = () => {
        return Promise.resolve({
          data: cachedResponse.data,
          status: request.status,
          statusText: request.statusText,
          headers: request.headers,
          config: request,
          request: request,
        }) as any;
      };

      return request;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    async (response: CachedAxiosResponse<any, any>) => {
      if (!response.config.cacheKey) return response;
      const ttl = response.config.ttl ?? DEFAULT_TTL;
      await cache.set(response.config.cacheKey, { data: response.data, validity: Date.now() + ttl });
      return response;
    },
    (error) => Promise.reject(error)
  );

  api.deleteCache = (cacheKey: string) => {
    return cache.del(cacheKey);
  };

  return api;
}
