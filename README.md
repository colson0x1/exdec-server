# ExDec Server - Express TypeScript Decorator Library

Welcome to the **ExDec Server - Express TypeScript Decorator Library**! This library empowers you to build robust Express applications with TypeScript while harnessing advanced concepts like decorators for route handlers and promoting a better app architecture. This library was written to enhances the developer experience elevating type safety.

![server - middleware listening request](https://i.imgur.com/1CQ7iGK.png)

## Installation as a module through NPM

```shell
$ npm i exdec
```

```js
// @ Uses
import { controller, get, post, bodyValidator, use } from 'exdec';
```

## Table of Contents

- [ExDec Server - Express TypeScript Decorator Library](#server---express-typescript-decorator-library)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
  - [Advanced Concepts](#advanced-concepts)
    - [Decorators](#decorators)
    - [Singleton Router](#singleton-router)
    - [Middleware](#middleware)
  - [Usage Examples](#usage-examples)
    - [Defining a Controller](#defining-a-controller)
    - [Applying Middleware](#applying-middleware)
  - [Screenshots](#screenshots)
    - [server - middleware listening requests](#server---middleware-listening-requests)
    - [server - login error](#server---login-error)
    - [server - protected route access forbidden](#server---protected-route-access-forbidden)
    - [server - login success](#server---login-success)
    - [server - access protected route after logged in](#server---access-protected-route-after-logged-in)
    - [server - Invalid input property error](#server---invalid-input-property-error)
    - [server - successful login](#server---successful-login)
    - [server - logout](#server---logout)

## Features

- **Decorator-Based Routing**: Utilize decorators such as `@get()`, `@post()`, and `@use()` to elegantly define route handlers and middleware.
- **Type Safety**: Leverage TypeScript's static typing to catch errors at compile-time and ensure robust code.
- **Modular Architecture**: Organize your codebase logically with controllers and routes for a maintainable application structure.
- **Request Body Validation**: Seamlessly validate request bodies using the `@bodyValidator()` decorator.
- **Middleware Support**: Attach middleware to specific routes with the `@use()` decorator.
- **Singleton Router**: Ensure a single instance of the Express router with the `AppRouter` singleton.

## Installation through git repository

To install this library, simply run:

```bash
npm install
```

## Getting Started

1. Configure your `tsconfig.json` to enable experimental support for decorators and metadata. Ensure that the `target` option is set to `"es5"` for compatibility:

```json
{
  "compilerOptions": {
    "target": "es5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    // ...
  }
}
```

2. Create a new Express application and set up the required middleware:

```typescript
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['your-secret-key'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

3. Define your controllers and routes using decorators. For instance, in `RootController.ts`:

```typescript
import { Request, Response } from 'express';
import { get, controller, use } from './decorators';

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    // Your route logic here
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    // Your protected route logic here
  }
}
```

4. Add your middleware functions or validation using decorators as needed, as demonstrated in `LoginController.ts`.

## Advanced Concepts

### Decorators

- **`@controller(routePrefix: string)`**: Specifies a controller class with an optional route prefix.

- **`@get(path: string)`**: Defines a GET route handler for the given path.

- **`@post(path: string)`**: Defines a POST route handler for the given path.

- **`@use(middleware: RequestHandler)`**: Attaches middleware to a route or controller.

- **`@bodyValidator(...keys: string[])`**: Validates request body properties before executing a route handler.

### Singleton Router

The `AppRouter` class provides a singleton instance of the Express router within the entire app architecture. Use it to ensure that all routes are attached to the same router instance.

### Middleware

Use the `@use()` decorator to attach middleware functions to specific routes or controllers. Middleware functions can be defined in separate modules and reused across different routes.

## Usage Examples

Here are some examples of how to use the library's features:

### Defining a Controller

```typescript
@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response) {
    // Route logic for login
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    // Route logic for login POST request
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    // Route logic for logout
  }
}
```

### Applying Middleware

```typescript
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    // Your route logic here
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    // Your protected route logic here
  }
}
```

## Screenshots

### server - middleware listening requests

![server - middleware listening requests](https://i.imgur.com/1CQ7iGK.png)

### server - login error

![server - login error](https://i.imgur.com/jVHd1tx.png)

![server - login error](https://i.imgur.com/hoTEiNq.png)

### server - protected route access forbidden

![server - protected route access forbidden](https://i.imgur.com/v39IvZh.png)

### server - login success

![server - login success](https://i.imgur.com/lqRVFTT.png)

![server - login success](https://i.imgur.com/m2LZy1k.png)

### server - access protected route after logged in

![server - access protected route after logged in](https://i.imgur.com/d2OIepS.png)

### server - Invalid input property error

![server - invalid input property error](https://i.imgur.com/T1B7bJH.png)

### server - successful login

![server - successful login](https://i.imgur.com/KMUwwVN.png)

### server - logout

![server - logout](https://i.imgur.com/BDOe5VR.png)
