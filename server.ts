import app from './src/api/v1/app';
import { loadConfig } from './src/api/v1/configs/configs';

const { serverCfg } = loadConfig();

const port = serverCfg.port || 3454;

const start = () => {
  const server = app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
  });
  process.on('SIGINT', () => {
    server.close(() => {
      console.log('server is closing');
    });
  });
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('server is closing');
    });
  });
};

start()