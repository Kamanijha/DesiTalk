import { io } from 'socket.io-client';

// Prefer connecting to the current origin so Vite proxy forwards /socket.io -> backend during dev.
// If VITE_BACKEND_URL is set, use that instead (production or custom dev host).
const BACKEND = import.meta.env.VITE_BACKEND_URL || '/';
const socket = io(BACKEND);

export default socket;
