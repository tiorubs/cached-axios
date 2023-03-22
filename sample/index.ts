import { CachedAxios } from "../src";

const api = CachedAxios({});

(async () => {
  //
  console.time("a1");
  await api("https://google.com", { cacheKey: "sample", ttl: 999 });
  console.timeEnd("a1");
  await api.deleteCache("sample");
  console.time("a2");
  await api.get("https://google.com", { cacheKey: "sample" });
  console.timeEnd("a2");
  //
})();
