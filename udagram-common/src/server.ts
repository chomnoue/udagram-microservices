import cors from 'cors';
import express, {Request, Response, Router} from 'express';
import {getSequelize} from './sequelize';

import bodyParser from 'body-parser';
import {DBConfig} from './config';
import {Model} from 'sequelize-typescript';
import {Server} from "http";
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import {NextFunction} from "connect";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

function assignId (req: Request, res: Response, next: NextFunction): void {
  const idHeader = req.header('X-Request-Id');
  if (idHeader) {
    req.id = idHeader.toString();
  } else {
    req.id = uuidv4();
  }
  next()
}

export async function startServer<M extends typeof Model> (config: DBConfig, models: M[], url: string, router: Router):
    Promise<Server> {
  const sequelize = getSequelize(config);
  await sequelize.addModels(models);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  morgan.token('id', function getRequestId (req: Request) {
    return req.id
  })

  app.use(assignId);
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :id - :response-time'));
  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: url,
  }));

  app.use('/api/v0/', router);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  return app.listen( port, () => {
    console.log( `server running http://localhost:${port}` );
    console.log( `press CTRL+C to stop server` );
  } );
}
