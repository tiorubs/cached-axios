"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CachedAxios = void 0;
var axios_1 = __importDefault(require("axios"));
var memory_cache_1 = require("./memory-cache");
var DEFAULT_TTL = 10 * 60 * 1000;
function CachedAxios(config, cache) {
    var _this = this;
    if (cache === void 0) { cache = new memory_cache_1.MemoryCache(); }
    var api = axios_1["default"].create(config);
    api.interceptors.request.use(function (request) { return __awaiter(_this, void 0, void 0, function () {
        var cachedResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!request.cacheKey)
                        return [2 /*return*/, request];
                    return [4 /*yield*/, cache.get(request.cacheKey)];
                case 1:
                    cachedResponse = _a.sent();
                    if (!cachedResponse)
                        return [2 /*return*/, request];
                    if (!(cachedResponse.validity < Date.now())) return [3 /*break*/, 3];
                    return [4 /*yield*/, cache.del(request.cacheKey)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, request];
                case 3:
                    cachedResponse.__cached = true;
                    request.data = cachedResponse;
                    request.adapter = function () {
                        return Promise.resolve({
                            data: cachedResponse.data,
                            status: request.status,
                            statusText: request.statusText,
                            headers: request.headers,
                            config: request,
                            request: request
                        });
                    };
                    return [2 /*return*/, request];
            }
        });
    }); }, function (error) { return Promise.reject(error); });
    api.interceptors.response.use(function (response) { return __awaiter(_this, void 0, void 0, function () {
        var ttl;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!response.config.cacheKey)
                        return [2 /*return*/, response];
                    ttl = (_a = response.config.ttl) !== null && _a !== void 0 ? _a : DEFAULT_TTL;
                    return [4 /*yield*/, cache.set(response.config.cacheKey, { data: response.data, validity: Date.now() + ttl })];
                case 1:
                    _b.sent();
                    return [2 /*return*/, response];
            }
        });
    }); }, function (error) { return Promise.reject(error); });
    return api;
}
exports.CachedAxios = CachedAxios;
