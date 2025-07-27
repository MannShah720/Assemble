import { useState } from 'react'
import { clsx } from "clsx"
import './App.css'
import { languages } from "./languages.js"

function App() {

  const [currentWord, setCurrentWord] = useState("react")

  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  console.log(wrongGuessesCount)
  
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
  }

  // Keyboard
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
      key={letter}
      className={className} 
      onClick={() => addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
    )
  })

  // Current Word on-screen
  const wordElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index}>
        {(guessedLetters.includes(letter)) ? letter.toUpperCase() : ""}
      </span>
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
          <h1>Assemble</h1>
          <p>Guess the word within 8 attempts to protect the 
          programming languages from Assembly!</p>
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
