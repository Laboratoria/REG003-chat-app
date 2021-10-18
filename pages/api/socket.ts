import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
    api: {
        bodyParser: false,
    },
};

const socket = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socket",
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
    }
    res.end();
};

export default socket;








// import express, { Express, Request, Response } from 'express';
// import * as http from 'http';
// import next, { NextApiHandler } from 'next';
// import * as socketio from 'socket.io';

// const port: number = parseInt(process.env.PORT || '3000', 10);
// const dev: boolean = process.env.NODE_ENV !== 'production';
// const nextApp = next({ dev });
// const nextHandler: NextApiHandler = nextApp.getRequestHandler();

// nextApp.prepare().then(async () => {
//     const app: Express = express();
//     const server: http.Server = http.createServer(app);
//     const io: socketio.Server = new socketio.Server();
//     io.attach(server);

//     app.get('/hello', async (_: Request, res: Response) => {
//         res.send('Hello World')
//     });

//     io.on('connection', (socket: socketio.Socket) => {
//         console.log('connection');
//         socket.emit('status', 'Hello from Socket.io');

//         socket.on('disconnect', () => {
//             console.log('client disconnected');
//         })
//     });

//     app.all('*', (req: any, res: any) => nextHandler(req, res));

//     server.listen(port, () => {
//         console.log(`> Ready on http://localhost:${port}`);
//     });
// });