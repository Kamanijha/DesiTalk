import React from 'react'

const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'bho', name: 'Bhojpuri' },
  { code: 'mai', name: 'Maithili' },
  { code: 'en', name: 'English' }
]

export default function LanguageSelect({ language, setLanguage }){
  return (
    <div>
      <h3>Select Your Language</h3>
      <div className="lang-grid">
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            className={`lang-btn ${language===l.code ? 'active' : ''}`}
            onClick={() => setLanguage(l.code)}
          >{l.name}</button>
        ))}
      </div>
      <div style={{marginTop:20}}>
        <button className="primary" onClick={() => { /* placeholder */ }}>Join Room</button>
      </div>
    </div>
  )
}
