import * as bodyParser from 'body-parser';
import * as express from 'express';

import { RegisterRoutes } from './routes/routes';

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

RegisterRoutes(app);
