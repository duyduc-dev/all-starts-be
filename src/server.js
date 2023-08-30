import { config as dotEnvConfig } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { connectToDataBase } from './configs/database';
import routerConfig from './routes';

dotEnvConfig();

class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.middleware();
    this.config();
  }

  middleware() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  config() {
    connectToDataBase();
    routerConfig(this.app);
  }

  bootstrap() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on Port: ${this.PORT}`);
    });
  }
}

new App().bootstrap();
