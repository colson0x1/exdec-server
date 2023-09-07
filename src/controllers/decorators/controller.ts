import 'reflect-metadata';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    /* 
      @ tsconfig.json
      "target": "es5"
    */
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      // Request Handler
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }

    /* 
      @ tsconfig.json
      "target": "es2016"
      NOTE: In ES2016, class methods are no longer enumerable
      Resolution for es2016

      Object.getOwnPropertyNames(target.prototype).forEach((key) => {
        const routeHandler = target.prototype[key];
        const path = Reflect.getMetadata('path', target.prototype, key);

        ...

        if (path) {
          router.get(`${routePrefix}${path}`, ...middlewares, routeHandler);
        }
      });
    */
  };
}
