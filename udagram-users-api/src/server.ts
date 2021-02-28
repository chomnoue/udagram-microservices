import {IndexRouter} from './controllers/v0/index.router';
import {config} from './config/config';
import {V0_USER_MODELS} from './controllers/v0/model.index';
import {startServer} from 'udagram-common';

startServer(config, V0_USER_MODELS, config.url, IndexRouter);
