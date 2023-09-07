import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

/* 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['lmao'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
*/

/*
@ Refractor express to work with TypeScript using Class based approach
*/
class Server {
  app: express.Express = express();

  constructor() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieSession({ keys: ['lmao'] }));
    this.app.use(AppRouter.getInstance());
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  }
}

new Server().start();
