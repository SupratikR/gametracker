import Debug from 'debug';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';

import mainRouter from './routes/main.routes.js';

// setup debug
const debug = Debug('GameTracker:app');

// create express app
const app = express();

// setup express middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(responseEnhancer());

// setup http server
const server = http.createServer(app);

// setup port and host
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

// setup application routes
app.use('/', mainRouter);

// listen to server on designated port
server.listen(port, host, () => debug('Server running on %s:%s', host, port));