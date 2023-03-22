export class MemoryCache {
  data: any;
  constructor() {
    this.data = {};
  }

  get(key: string) {
    return this.data[key] || undefined;
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  del(key: string) {
    this.data[key] = undefined;
  }
}
