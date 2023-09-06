import { formatDate } from '@/utils/helper';

class AppController {
  // [GET] /
  index(_, res) {
    res.json({
      name: 'All stars',
      source_name: 'all-star-be',
      message: 'Welcome to All Star Backend',
      now: formatDate(new Date()),
      instruction:
        'Clone source code from https://github.com/duyduc-dev/all-starts-be/tree/production' +
        '. Create file .env then add variable PORT=<your-port>. Example: PORT=3001' +
        '. Then run with develop by npm run dev',
    });
  }
}

const appController = new AppController();

export default appController;
