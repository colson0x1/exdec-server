"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        /*
          tsconfig.json
          "target": "es5"
        */
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Method, target.prototype, key);
            if (path) {
                router[method]("".concat(routePrefix).concat(path), routeHandler);
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
