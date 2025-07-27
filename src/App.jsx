import { useState } from 'react'
import { clsx } from "clsx"
import './App.css'
import { languages } from "./languages.js"

function App() {

  // ----------- States -----------
  const [currentWord, setCurrentWord] = useState("react")

  const [guessedLetters, setGuessedLetters] = useState([])

  // ----------- Game Conditions -----------
  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost = wrongGuessesCount >= languages.length - 1

  const isGameOver = isGameWon || isGameLost
  
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
  }

  // ----------- Keyboard -----------
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
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  // ----------- Current Word -----------
  const wordElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index}>
        {(guessedLetters.includes(letter)) ? letter.toUpperCase() : ""}
      </span>
    )
  })

  // ----------- Lang Chips -----------
  const langElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessesCount
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    const className = clsx("chip", isLanguageLost && "lost")
    
    return (
      <span
        className={className}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    )
  })

  // ----------- Game Status -----------
  const wonMessage = (
    <>
      <h2>You Win!</h2>
      <p>Well done! 🎉</p>
    </>
  )

  const lostMessage = (
    <>
      <h2>You Lost!</h2>
      <p>Better start learning Assembly 😭</p>
    </>
  )

  const gameStatusClassName = clsx("game-status",{
    won: isGameWon,
    lost: isGameLost
  })

  const newGameBtn = <button className="new-game">New Game</button>

  // ----------- Return -----------
  return (
    <main>
      <header>
          <h1>Assemble</h1>
          <p>Guess the word within 8 attempts to protect the 
          programming languages from Assembly!</p>
      </header>

      <section className={gameStatusClassName}>
        {isGameOver ? (isGameWon ? wonMessage : lostMessage) : (null)}
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

      {isGameOver && newGameBtn}
    </main>
  )
}

export default App
