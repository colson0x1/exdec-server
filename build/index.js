"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
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
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_session_1.default)({ keys: ['lmao'] }));
        this.app.use(AppRouter_1.AppRouter.getInstance());
    }
    Server.prototype.start = function () {
        this.app.listen(3000, function () {
            console.log('Listening on port 3000');
        });
    };
    return Server;
}());
new Server().start();
