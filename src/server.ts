process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import AuthController from './controllers/auth.controller';
import BookingManagerController from './controllers/BookingManager.controller';
import CinemaManagerController from './controllers/CinemaManager.controller';
import MovieManagerController from './controllers/MoviesManager.controller';
import UsersManagerController from './controllers/UsersManager.controller';

validateEnv();

const app = new App([AuthController, UsersManagerController, BookingManagerController, CinemaManagerController, MovieManagerController]);

app.listen();
