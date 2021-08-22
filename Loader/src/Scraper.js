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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Scraper = void 0;
var node_html_parser_1 = require("node-html-parser");
var axios_1 = require("axios");
var Scraper = /** @class */ (function () {
    function Scraper(url, params) {
        this.url = url;
        this.params = params;
        this.productLinks = [];
        this.products = [];
    }
    Scraper.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllProductLinks()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductsInfo()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scraper.prototype.getAllProductLinks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxPage, i, products;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getPage(this.url)];
                    case 1:
                        maxPage = +(_b.sent()).querySelector('div.PAGINGUP_DOWN > ul > li:nth-child(8) > a')
                            .innerText;
                        i = 1;
                        _b.label = 2;
                    case 2:
                        if (!(i <= maxPage)) return [3 /*break*/, 5];
                        console.clear();
                        console.log('Step 1 getAllProductLinks');
                        console.log(i + "/" + maxPage);
                        return [4 /*yield*/, this.getAllProductLinksFromPage(i)];
                    case 3:
                        products = _b.sent();
                        (_a = this.productLinks).push.apply(_a, products);
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Scraper.prototype.getAllProductLinksFromPage = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var createdUrl, pageBody, urlElements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createdUrl = this.createUrl([page]);
                        return [4 /*yield*/, this.getPage(createdUrl)];
                    case 1:
                        pageBody = _a.sent();
                        urlElements = __spreadArray([], pageBody.querySelectorAll('div.product-overlay > a'));
                        return [2 /*return*/, urlElements.map(function (item) { var _a; return "https://www.deichmann.com/" + ((_a = item.getAttribute('href')) !== null && _a !== void 0 ? _a : ''); })];
                }
            });
        });
    };
    Scraper.prototype.createUrl = function (paramData) {
        var result = this.url + '?';
        for (var i = 0; i < this.params.length; i++) {
            result += this.params[i] + "=" + paramData[i] + "&";
        }
        return result.slice(0, -1);
    };
    Scraper.prototype.getPage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get(url)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, node_html_parser_1.parse(response.data)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error('Not Found');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scraper.prototype.getProductsInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _loop_1, this_1, _i, _a, url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = [];
                        _loop_1 = function (url) {
                            var result, extractedProductData, err_2;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 2, , 3]);
                                        console.clear();
                                        console.log('Step 2 getProductsInfo');
                                        console.log(this_1.productLinks.findIndex(function (item) { return item === url; }) + "/" + this_1.productLinks.length);
                                        return [4 /*yield*/, this_1.getPage(url)];
                                    case 1:
                                        result = _c.sent();
                                        extractedProductData = this_1.extractData(result);
                                        this_1.products.push(extractedProductData);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _c.sent();
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.productLinks;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        url = _a[_i];
                        return [5 /*yield**/, _loop_1(url)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scraper.prototype.extractData = function (body) {
        var _a;
        var id = body.querySelector('#product-description div').innerText.split(';')[1];
        var brand = body.querySelector('.features > h1 a').innerText;
        var name = body.querySelector('.features .product-name').innerText;
        var price = +body.querySelector('div.priceWrapper div div span.val').innerText.replace(',', '.');
        var photoUrl = (_a = body.querySelector('.product-image img').getAttribute('src')) !== null && _a !== void 0 ? _a : '';
        var description = body
            .querySelector('#product-description')
            .innerText.split('\n')
            .map(function (item) { return item.split(': '); })
            .filter(function (item) { return item.length === 2; });
        return {
            id: id,
            brand: brand,
            name: name,
            price: price,
            added: new Date(),
            material: this.getProductProp(description, 'material').trim().replace('&nbsp;', ''),
            color: this.getProductProp(description, 'color').trim().replace('&nbsp;', ''),
            model: this.getProductProp(description, 'model').trim().replace('&nbsp;', ''),
            photoUrl: photoUrl
        };
    };
    Scraper.prototype.getProductProp = function (descriptions, prop) {
        for (var i = 0; i < descriptions.length; i++) {
            switch (descriptions[i][0].trim()) {
                case 'kolor':
                    if ('color' === prop) {
                        return this.normaliseReturedString(descriptions[i][1]);
                    }
                    break;
                case 'materiał wierzchni':
                    if ('material' === prop) {
                        return this.normaliseReturedString(descriptions[i][1]);
                    }
                    break;
                case 'model':
                    if ('model' === prop) {
                        return this.normaliseReturedString(descriptions[i][1]);
                    }
                    break;
            }
        }
        return '';
    };
    Scraper.prototype.normaliseReturedString = function (str) {
        return str.trim().replace('&nbsp;', '').replace('&oacute;', '');
    };
    return Scraper;
}());
exports.Scraper = Scraper;
