"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
function controller(routePrefix) {
    return function (target) {
        /*
          tsconfig.json
          "target": "es5"
        */
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata('path', target.prototype, key);
            if (path) {
                exports.router.get("".concat(routePrefix).concat(path), routeHandler);
            }
        }
        /*
          tsconfig.json
          "target": "es2016"
          NOTE: In ES2016, class methods are no longer enumerable
          Resolution for es2016
    
          Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata('path', target.prototype, key);
    
            if (path) {
              router.get(`${routePrefix}${path}`, routeHandler);
            }
          });
        */
    };
}
exports.controller = controller;
