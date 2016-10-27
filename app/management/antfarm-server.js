"use strict";
var AntfarmServer = (function () {
    function AntfarmServer(host, port) {
        this.host = host;
        this.port = port;
    }
    AntfarmServer.prototype.getHost = function () {
        return this.host;
    };
    AntfarmServer.prototype.getPort = function () {
        return this.port;
    };
    AntfarmServer.prototype.getUrl = function () {
        return "http://" + this.host + ":" + this.port;
    };
    return AntfarmServer;
}());
exports.AntfarmServer = AntfarmServer;
//# sourceMappingURL=antfarm-server.js.map