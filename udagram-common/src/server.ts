import cors from 'cors';
import express, {Router} from 'express';
import {getSequelize} from './sequelize';

import bodyParser from 'body-parser';
import {DBConfig} from './config';
import {Model} from 'sequelize-typescript';
import {Server} from "http";


export async function startServer(config: DBConfig, models: Array<typeof Model>, url: string, router: Router):
    Promise<Server> {
  const sequelize = getSequelize(config);
  await sequelize.addModels(models);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

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
