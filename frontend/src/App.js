import React, { useState } from 'react'
import Login from './components/Login'
import Translator from './components/Translator'

export default function App(){
  const [user, setUser] = useState(null)
  return (
    <div className="app">
      {!user ? (
        <Login onLogin={(u)=>setUser(u)} />
      ) : (
        <Translator user={user} />
      )}
    </div>
  )
}
