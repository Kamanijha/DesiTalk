import React, { useState } from 'react'
import Login from './components/Login.jsx'
import Translator from './components/Translator.jsx'

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
