import {IndexRouter} from './controllers/v0/index.router';
import {config} from './config/config';
import {V0_FEED_MODELS} from './controllers/v0/model.index';
import {startServer} from '@chomnoue/udagram-common';

startServer(config, V0_FEED_MODELS, config.url, IndexRouter);
