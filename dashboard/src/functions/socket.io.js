import { io } from 'socket.io-client';

const URL =  'http://localhost:3009';

export const socket = io(URL);