import { io } from 'socket.io-client';
const port = 8080;
const socket = io(`http://localhost:${port}`);


socket.on('connect', () => console.log('connect'));