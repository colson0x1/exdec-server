"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.head = exports.options = exports.patch = exports.del = exports.put = exports.post = exports.get = exports.all = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
exports.all = routeBinder(Methods_1.Methods.all);
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.put = routeBinder(Methods_1.Methods.put);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
exports.options = routeBinder(Methods_1.Methods.options);
exports.head = routeBinder(Methods_1.Methods.head);
