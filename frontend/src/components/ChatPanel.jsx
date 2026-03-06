import React from 'react'
import Translator from './Translator.jsx'

export default function ChatPanel({ user }){
  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div>Room: <strong>{user?.room || '—'}</strong></div>
        <div>Connected</div>
      </div>
      <div className="chat-body">
        <Translator user={user} />
      </div>
    </div>
  )
}
