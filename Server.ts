import * as http from 'http';
import * as debug from 'debug';
import App from './App';

class Server {
  public port: any;
  public server: any;
  public portValue: any;

  constructor() {
    debug('ts-express:server');
    this.portValue = this.normalizePort(process.env.PORT || 8080);
    App.set('port', this.portValue);

    this.server = http.createServer(App);
    this.server.listen(this.portValue);
    this.server.on('error', (error: NodeJS.ErrnoException): void => {
      if (error.syscall !== 'listen') throw error;
      let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
      switch(error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    this.server.on('listening', (): void => {
      let addr = this.server.address();
      let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
      debug(`Listening on ${bind}`);
    });
  }

  private normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

/*
  public onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  public onListening(): void {
    let addr = this.server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
*/
}
new Server();