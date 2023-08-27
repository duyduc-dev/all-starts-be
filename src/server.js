import { config as dotEnvConfig } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import routerConfig from './routes';

class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;

    this.config();
    this.middleware();
  }

  middleware() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  config() {
    dotEnvConfig({
      path: '../.env',
    });
    routerConfig(this.app);
  }

  bootstrap() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on Port: ${this.PORT}`);
    });
  }
}

new App().bootstrap();
