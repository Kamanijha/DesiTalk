import React, { useState } from 'react'
import Login from './components/Login.jsx'
import Translator from './components/Translator.jsx'
import LanguageSelect from './components/LanguageSelect.jsx'
import RoomCode from './components/RoomCode.jsx'
import socket from './socket'

export default function App(){
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('main')
  const [language, setLanguage] = useState('hi')
  const [user, setUser] = useState(null)

  function handleJoin(){
    if(!username) return alert('Enter a name before joining')
    // set user and emit join
    const u = { username, room, language }
    setUser(u)
    socket.emit('join', { username, room })
  }

  return (
    <div className="app">
      <div className="panels">
        <div className="panel card">
          <Login username={username} setUsername={setUsername} onRequestJoin={handleJoin} />
        </div>

        <div className="panel card">
          <LanguageSelect language={language} setLanguage={setLanguage} />
        </div>

        <div className="panel card">
          <RoomCode room={room} setRoom={setRoom} onJoin={handleJoin} />
        </div>

        <div className="panel card chat-panel">
          <Translator user={user || { username, room, language }} />
        </div>
      </div>
    </div>
  )
}
