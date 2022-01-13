process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import IndexController from './controllers/index.controller';

validateEnv();

const app = new App([AuthController, UsersController, IndexController]);

app.listen();
