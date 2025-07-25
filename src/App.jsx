import { useState } from 'react'
import './App.css'
import { languages } from "./languages.js"

function App() {

  const [currentWord, setCurrentWord] = useState("react")

  // Keyboard
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboardElements = alphabet.split("").map(letter => {
    return (
      <button key={letter}>{letter.toUpperCase()}</button>
    )
  })

  const wordElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index}>{letter.toUpperCase()}</span>
    )
  })

  const langElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    return (
      <span 
      key={lang.name}
      className="chip" 
      style={styles}>{lang.name}</span>
    )
  })

  return (
    <main>
      <header>
          <h1>Codel</h1>
          <p>Guess the word within 8 attempts to protect the 
          programming languages!</p>
      </header>

      <section className="game-status">
        <h2>You Win!</h2>
        <p>Well done! 🎉</p>
      </section>

      <section className="language-chips">
        {langElements}
      </section>

      <section className="word">
        {wordElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
