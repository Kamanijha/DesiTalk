import React, { useState } from 'react'

export default function RoomCode({ room, setRoom, onJoin }){
  const [local, setLocal] = useState(room || '')

  function createRoom(){
    // simple random room
    const r = Math.floor(100000 + Math.random()*900000).toString()
    setLocal(r)
    setRoom(r)
  }

  function join(){
    setRoom(local)
    if(onJoin) onJoin()
  }

  return (
    <div>
      <h3>Enter Room Code</h3>
      <input value={local} onChange={e=>setLocal(e.target.value)} placeholder="123456" />
      <div style={{marginTop:10}}>
        <button className="secondary" onClick={createRoom}>Create Room</button>
        <button className="primary" onClick={join} style={{marginLeft:8}}>Join Room</button>
      </div>
    </div>
  )
}
