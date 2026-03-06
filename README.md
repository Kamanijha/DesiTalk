# DesiTalk — Real-Time Language Translator

A starter full-stack web app to translate and stream speech in real time between users.

Tech stack
- Frontend: React
- Backend: Node.js + Express
- Realtime: Socket.io
- Speech-to-text: OpenAI Whisper API
- Translation: Google Cloud Translate API
- Text-to-speech: ElevenLabs TTS API

Features
- User login (simple username/room join)
- Language selection
- Microphone capture
- Whisper transcription
- Google Translate translation
- ElevenLabs TTS audio generation
- Realtime audio and subtitles streaming via Socket.io

See `backend/.env.example` for required environment variables.

Run
1. Backend: cd backend && npm install && npm run start
2. Frontend: cd frontend && npm install && npm run start

Open two browser windows, login with different usernames and the same room to test realtime translation.
