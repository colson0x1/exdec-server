import { Request, Response, NextFunction } from 'express';
import { get, controller, use, post, bodyValidator } from './decorators';

/* 
@ Testing use decorator for this middleware
function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!!!');
  next();
} 
*/

@controller('/auth')
class LoginController {
  /*
  @ Example function that doesn't satisfy RouteHandlerDescriptor
  @ The PropertyDescriptor value of this function should use RequestHandler
    that takes Request & produce Response for it to qualify as a Route Handler

  @get('/')
  add(a: number, b: number): number {
    return a + b;
  }
  */

  @get('/login')
  // @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'cols@google.com' && password === 'cols') {
      req.session = { loggedIn: true };

      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
