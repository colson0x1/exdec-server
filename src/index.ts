import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

/* const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['lmao'] }));
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
}); */

/* 
@ Refractor express to work with TypeScript using Class based approach
*/
class Server {
  app: express.Express = express();

  constructor() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieSession({ keys: ['lmao'] }));
    this.app.use(router);
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  }
}

new Server().start();
