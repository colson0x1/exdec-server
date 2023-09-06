"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
function controller(routePrefix) {
    return function (target) {
        /*
          tsconfig.json
          "target": "es5"
        */
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata('path', target.prototype, key);
        }
        /*
          tsconfig.json
          "target": "es2016"
          NOTE: In ES2016, class methods are no longer enumerable
          Resolution for es2016
    
          Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata('path', target.prototype, key);
          });
        */
    };
}
exports.controller = controller;
