import {Sequelize} from 'sequelize-typescript';
import {DBConfig} from './config';


export function getSequelize(config: DBConfig): Sequelize {
  return new Sequelize({
    'username': config.username,
    'password': config.password,
    'database': config.database,
    'host': config.host,
    'dialect': config.dialect,
    'storage': ':memory:',
  });
}
