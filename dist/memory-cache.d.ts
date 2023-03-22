export declare class MemoryCache {
    data: any;
    constructor();
    get(key: string): any;
    set(key: string, value: any): void;
    del(key: string): void;
}
