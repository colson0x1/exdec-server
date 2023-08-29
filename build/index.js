"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = require("./routes/loginRoutes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
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
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_session_1.default)({ keys: ['lmao'] }));
        this.app.use(loginRoutes_1.router);
    }
    start() {
        this.app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    }
}
new Server().start();
