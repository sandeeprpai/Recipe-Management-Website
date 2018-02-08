"use strict";
exports.__esModule = true;
var http = require("http");
var debug = require("debug");
var App_1 = require("./App");
var Server = (function () {
    function Server() {
        var _this = this;
        debug('ts-express:server');
        this.portValue = this.normalizePort(process.env.PORT || 8080);
        App_1["default"].set('port', this.portValue);
        this.server = http.createServer(App_1["default"]);
        this.server.listen(this.portValue);
        this.server.on('error', function (error) {
            if (error.syscall !== 'listen')
                throw error;
            var bind = (typeof _this.port === 'string') ? 'Pipe ' + _this.port : 'Port ' + _this.port;
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + " requires elevated privileges");
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        this.server.on('listening', function () {
            var addr = _this.server.address();
            var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
            debug("Listening on " + bind);
        });
    }
    Server.prototype.normalizePort = function (val) {
        var port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    };
    return Server;
}());
new Server();
