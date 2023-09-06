import { Router, Request, Response, NextFunction } from 'express'

@controller('/')
class LoginController {
  getLogin(req: Request, res: Response): void {
    @get('/login')
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
  };
}