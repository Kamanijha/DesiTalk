import React, { useState } from 'react'
import socket from '../socket'

export default function Login({ onLogin }){
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('main');

  function join(){
    if(!username) return alert('Enter a username');
    socket.emit('join', { username, room });
    onLogin({ username, room });
  }

  return (
    <div>
      <h2>Join DesiTalk</h2>
      <div>
        <input placeholder="Your name" value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <div>
        <input placeholder="Room" value={room} onChange={e=>setRoom(e.target.value)} />
      </div>
      <button onClick={join}>Join</button>
    </div>
  )
}
