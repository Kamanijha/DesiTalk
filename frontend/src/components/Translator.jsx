import React, { useEffect, useRef, useState } from 'react'
import socket from '../socket'
import axios from 'axios'

const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'bho', name: 'Bhojpuri' },
  { code: 'mai', name: 'Maithili' },
  { code: 'en', name: 'English' }
]

export default function Translator({ user }){
  const [target, setTarget] = useState('hi')
  const [listening, setListening] = useState(false)
  const [subtitles, setSubtitles] = useState([])
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)

  useEffect(()=>{
    socket.on('receive-audio', async (payload) => {
      const { audioBase64, text, from } = payload;
      if (audioBase64) {
        const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
        audio.play().catch(()=>{});
      }
      if (text) {
        setSubtitles(s => [...s, `${from}: ${text}`]);
      }
    });

    return () => socket.off('receive-audio');
  },[])

  async function startRecording(){
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return alert('getUserMedia not supported in this browser');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      }

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const form = new FormData();
        form.append('file', blob, 'speech.webm');

        try {
          // 1) Whisper
          const wresp = await axios.post('/api/whisper', form, { headers: { 'Content-Type': 'multipart/form-data' } });
          const originalText = wresp.data.text || '';
          setSubtitles(s => [...s, `${user.username}: ${originalText}`]);

          // 2) Translate
          const tresp = await axios.post('/api/translate', { text: originalText, target });
          const translated = tresp.data.text || '';

          // 3) TTS
          const ttresp = await axios.post('/api/tts', { text: translated });
          const audioBase64 = ttresp.data.audioBase64;

          // 4) Emit to room
          socket.emit('send-audio', { audioBase64, text: translated, from: user.username });

          // play locally
          const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
          audio.play().catch(()=>{});
        } catch (err) {
          console.error('Processing error', err);
        } finally {
          // stop and cleanup tracks
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
          }
        }
      }

      mediaRecorderRef.current.start();
      setListening(true);
    } catch (err) {
      console.error('startRecording error', err);
      alert('Could not start microphone');
    }
  }

  function stopRecording(){
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    } catch (err) { console.error(err) }
    setListening(false);
  }

  // pointer/touch handlers for hold-to-talk
  function handlePointerDown(e){
    e.preventDefault();
    if (!listening) startRecording();
  }
  function handlePointerUp(e){
    e.preventDefault();
    if (listening) stopRecording();
  }

  return (
    <div>
      <h3>Logged in as {user.username}</h3>
      <div className="controls">
        <select value={target} onChange={e=>setTarget(e.target.value)}>
          {LANGUAGES.map(l=> (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
        <button
          className="mic-btn"
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          {listening ? 'Release to Send' : 'Hold to Talk'}
        </button>
      </div>

      <div className="subtitles">
        <strong>Subtitles:</strong>
        <div>
          {subtitles.map((s,i)=>(<div key={i}>{s}</div>))}
        </div>
      </div>
    </div>
  )
}
