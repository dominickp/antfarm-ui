export class AntfarmServer {
    private host: string;
    private port: number;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    public getHost() {
        return this.host;
    }

    public getPort() {
        return this.port;
    }

    public getUrl() {
        return `http://${this.host}:${this.port}`;
    }
}