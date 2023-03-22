"use strict";
exports.__esModule = true;
exports.MemoryCache = void 0;
var MemoryCache = /** @class */ (function () {
    function MemoryCache() {
        this.data = {};
    }
    MemoryCache.prototype.get = function (key) {
        return this.data[key] || undefined;
    };
    MemoryCache.prototype.set = function (key, value) {
        this.data[key] = value;
    };
    MemoryCache.prototype.del = function (key) {
        this.data[key] = undefined;
    };
    return MemoryCache;
}());
exports.MemoryCache = MemoryCache;
