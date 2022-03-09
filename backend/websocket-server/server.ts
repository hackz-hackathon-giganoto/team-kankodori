import http from 'http';
import socketio from 'socket.io';

const server: http.Server = http.createServer();
const io: socketio.Server = new socketio.Server(server);

io.on('connection', (socket: socketio.Socket) => console.log('connect'));

const port = 8080;
server.listen(port, () => console.log(`app listening on port ${port}`));