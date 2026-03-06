import React, { useState } from 'react'
import socket from '../socket'

export default function Login({ username, setUsername, onRequestJoin }){
  return (
    <div className="login-card">
      <h2>Welcome to LangTalk</h2>
      <div className="login-box">
        <label>Enter your name</label>
        <input placeholder="John" value={username} onChange={e=>setUsername(e.target.value)} />
        <button className="primary" onClick={onRequestJoin} style={{marginTop:12}}>Login</button>
      </div>
    </div>
  )
}
