# ExDec Server (exdec npm)

**ExDec Server** is an engineering-driven toolkit crafted for building sophisticated Express applications with TypeScript. With a vibe akin to NestJS, ExDec harnesses TypeScript decorators to deliver clean, modular route management, middleware handling, and scalable application architectures. Whether you're developing APIs, microservices, or complex web platforms, ExDec brings the rigor of type safety and the clarity of structured design to your codebase. It’s designed to empower engineers to tackle real-world challenges with efficiency, maintainability, and scalability in mind—making it the ideal solution for teams focused on delivering high-performance, production-grade software.

![server - middleware listening request](https://i.imgur.com/1CQ7iGK.png)

## Installation as a module through NPM

```shell
$ npm i exdec
```

```js
// @ ExDec
import {
  use,
  controller,
  AppRouter,
  bodyValidator,
  all,
  get,
  post,
  put,
  del,
  patch,
  options,
  head,
} from 'exdec';
```

## Table of Contents

- [ExDec Server (exdec npm)](#exdec-server-exdec-npm)
  - [Installation as a module through NPM](#installation-as-a-module-through-npm)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation through git repository](#installation-through-git-repository)
  - [Getting Started](#getting-started)
  - [Advanced Concepts](#advanced-concepts)
    - [Decorators](#decorators)
    - [Singleton Router](#singleton-router)
    - [Middleware](#middleware)
  - [Usage Examples](#usage-examples)
    - [Defining a Controller](#defining-a-controller)
    - [Applying Middleware](#applying-middleware)
  - [ExDec - Build Production API: Twitter Showcase](#exdec---build-production-api-twitter-showcase)
    - [Introduction](#introduction)
    - [Key Features:](#key-features)
    - [Project Structure](#project-structure)
    - [1. `package.json`](#1-packagejson)
    - [2. `src/App.ts`](#2-srcappts)
    - [3. `src/controllers/UserController.ts`](#3-srccontrollersusercontrollerts)
    - [4. `src/controllers/PostController.ts`](#4-srccontrollerspostcontrollerts)
    - [5. `src/services/UserService.ts`](#5-srcservicesuserservicets)
    - [6. `src/services/PostService.ts`](#6-srcservicespostservicets)
    - [7. `src/models/UserModel.ts`](#7-srcmodelsusermodelts)
    - [8. `src/models/PostModel.ts`](#8-srcmodelspostmodelts)
    - [Conclusion](#conclusion)
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

## ExDec - Build Production API: Twitter Showcase

### Introduction

Building a production-grade Twitter-like social network using the `exdec` library would involve designing an architecture that supports user registration, authentication, post creation, comment management, likes, follows, timelines, notifications, and more.

Below is a high-level overview and code demonstrating how to implement such a project in a professional, scalable manner using Express with TypeScript and `exdec`. This approach mirrors how senior engineers at big tech companies build robust, scalable systems for social platforms.

### Key Features:

- **User Management**: Registration, Login, Follow/Unfollow, Profile
- **Post Management**: Tweet, Like, Comment
- **Feed**: User timeline, Global timeline
- **Notifications**: Likes, Comments, Follows

### Project Structure

```
/exdec-twitter
|-- /src
|   |-- /controllers
|   |   |-- UserController.ts
|   |   |-- PostController.ts
|   |   |-- AuthController.ts
|   |-- /middleware
|   |   |-- authMiddleware.ts
|   |-- /services
|   |   |-- UserService.ts
|   |   |-- PostService.ts
|   |   |-- NotificationService.ts
|   |-- /models
|   |   |-- UserModel.ts
|   |   |-- PostModel.ts
|   |   |-- NotificationModel.ts
|   |-- /decorators
|   |-- /config
|   |   |-- config.ts
|   |-- /db
|   |   |-- connection.ts
|   |-- App.ts
|-- /build
|-- package.json
|-- tsconfig.json
|-- .gitignore
```

### 1. `package.json`

```json
{
  "name": "exdec-twitter",
  "version": "1.0.0",
  "description": "A Twitter-like social network built with Express and exdec decorators.",
  "main": "build/App.js",
  "author": "COLSON",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "start": "node build/App.js",
    "start:dev": "tsc -w & nodemon build/App.js",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "express": "^4.18.2",
    "reflect-metadata": "^0.1.13",
    "exdec": "^1.0.0",
    "mongoose": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "nodemon": "^3.0.1",
    "@types/node": "^20.4.0",
    "@types/express": "^4.17.17",
    "@types/mongoose": "^5.11.97",
    "@types/jsonwebtoken": "^9.0.0"
  }
}
```

### 2. `src/App.ts`

```typescript
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from 'exdec';
import { connectToDB } from './db/connection';
import { config } from './config/config';

// Initialize express
const app = express();

// DB connection
connectToDB();

// Middleware
app.use(bodyParser.json());
app.use(cookieSession({ keys: [config.sessionSecret] }));

// App routes
app.use(AppRouter.getInstance());

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

### 3. `src/controllers/UserController.ts`

```typescript
import { Request, Response } from 'express';
import { controller, get, post, bodyValidator } from 'exdec';
import { UserService } from '../services/UserService';
import { requireAuth } from '../middleware/authMiddleware';

@controller('/users')
class UserController {
  private userService = new UserService();

  @post('/register')
  @bodyValidator('username', 'password', 'email')
  async register(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;
    const user = await this.userService.createUser(username, password, email);
    res.status(201).json(user);
  }

  @post('/login')
  @bodyValidator('username', 'password')
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const token = await this.userService.authenticate(username, password);

    if (token) {
      req.session = { jwt: token };
      res.status(200).send({ message: 'Login successful', token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  }

  @get('/profile')
  @requireAuth
  async getProfile(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getProfile(req.currentUser!.id);
    res.status(200).json(user);
  }

  @post('/follow/:id')
  @requireAuth
  async followUser(req: Request, res: Response): Promise<void> {
    const followId = req.params.id;
    await this.userService.followUser(req.currentUser!.id, followId);
    res.status(200).send('User followed');
  }
}
```

### 4. `src/controllers/PostController.ts`

```typescript
import { Request, Response } from 'express';
import { controller, get, post, bodyValidator } from 'exdec';
import { PostService } from '../services/PostService';
import { requireAuth } from '../middleware/authMiddleware';

@controller('/posts')
class PostController {
  private postService = new PostService();

  @post('/')
  @requireAuth
  @bodyValidator('content')
  async createPost(req: Request, res: Response): Promise<void> {
    const { content } = req.body;
    const post = await this.postService.createPost(
      req.currentUser!.id,
      content,
    );
    res.status(201).json(post);
  }

  @post('/:postId/like')
  @requireAuth
  async likePost(req: Request, res: Response): Promise<void> {
    const { postId } = req.params;
    await this.postService.likePost(req.currentUser!.id, postId);
    res.status(200).send('Post liked');
  }

  @get('/timeline')
  @requireAuth
  async getTimeline(req: Request, res: Response): Promise<void> {
    const timeline = await this.postService.getUserTimeline(
      req.currentUser!.id,
    );
    res.status(200).json(timeline);
  }
}
```

### 5. `src/services/UserService.ts`

```typescript
import { UserModel } from '../models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class UserService {
  async createUser(username: string, password: string, email: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: hashedPassword, email });
    await user.save();
    return user;
  }

  async authenticate(username: string, password: string) {
    const user = await UserModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, config.jwtSecret);
      return token;
    }
    return null;
  }

  async getProfile(userId: string) {
    return UserModel.findById(userId);
  }

  async followUser(userId: string, followId: string) {
    const user = await UserModel.findById(userId);
    user.following.push(followId);
    await user.save();
  }
}
```

### 6. `src/services/PostService.ts`

```typescript
import { PostModel } from '../models/PostModel';

export class PostService {
  async createPost(userId: string, content: string) {
    const post = new PostModel({ userId, content });
    await post.save();
    return post;
  }

  async likePost(userId: string, postId: string) {
    const post = await PostModel.findById(postId);
    if (post) {
      post.likes.push(userId);
      await post.save();
    }
  }

  async getUserTimeline(userId: string) {
    return PostModel.find({ userId }).sort({ createdAt: -1 });
  }
}
```

### 7. `src/models/UserModel.ts`

```typescript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('User', userSchema);
```

### 8. `src/models/PostModel.ts`

```typescript
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const PostModel = mongoose.model('Post', postSchema);
```

### Conclusion

This code structure provides a professional, production-ready social network using Express, TypeScript, `exdec`, and MongoDB. It includes proper user authentication, post creation, likes, and follows, all organized following best practices. Scalability, maintainability, and a clean separation of concerns are achieved using service layers, controllers, and models. You can enhance this by adding more features like notifications, caching, and WebSockets for real-time updates.

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
