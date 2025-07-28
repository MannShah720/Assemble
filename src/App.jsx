import { useState } from 'react'
import { clsx } from "clsx"
import './App.css'
import { languages } from "./languages.js"
import { getFarewellText, getRandomWord, setWordList, getWordListType } from "./utils.js"
import Confetti from "react-confetti"
import useWindowSize from './useWindowSize'

function App() {

  // ----------- States -----------
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())

  console.log(currentWord)

  const [guessedLetters, setGuessedLetters] = useState([])

  const [wordListType, setWordListTypeState] = useState(getWordListType())

  // ----------- Game Values -----------
  const numGuessesLeft = languages.length - 1

  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost = wrongGuessesCount >= numGuessesLeft

  const isGameOver = isGameWon || isGameLost

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]

  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  const { width, height } = useWindowSize();

   // ----------- Functions -----------
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }
  
  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }
  
  function toggleWordListType() {
    const newType = (wordListType === "normal" )? "tech" : "normal"
    setWordList(newType)
    setWordListTypeState(newType)
    startNewGame()
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
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  // ----------- Current Word -----------
  const wordElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const className = clsx(isGameLost && !guessedLetters.includes(letter) && "missed-letter")

    return (
      <span key={index} className={className}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    )
  })

  // ----------- Language Chips -----------
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
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return <p className="farewell-message">
        {getFarewellText(languages[wrongGuessesCount - 1].name)}
      </p>
    }

    if (isGameWon) {
      return (wonMessage)
    }

    if (isGameLost) {
      return (lostMessage)
    }
  }

  // ----------- Buttons -----------
  const newGameBtn = (
    <div className="new-game-wrapper">
      <button
        className="new-game"
        style={{ visibility: isGameOver ? 'visible' : 'hidden' }}
        onClick={startNewGame}
      >
        New Game
      </button>
    </div>
  )

  const toggleBtn = (
    <div className="toggle-wrapper">
      <div className="toggle-container" onClick={toggleWordListType}>
        <div className={`toggle-switch ${wordListType === "tech" ? "active" : ""}`}>
          <div className="toggle-circle" />
        </div>
        <span className="toggle-label">
          {wordListType === "tech" ? "Tech Words" : "Normal Words"}
        </span>
      </div>
    </div>
  )

  // ----------- Return -----------
  return (
    <main className={`theme-${wordListType}`}>
      {
        isGameWon && <Confetti 
                        width={width - 5} 
                        height={height - 5} 
                        recycle={false} 
                        numberOfPieces={1000}/>
      }
      <header>
          <h1>Assemble</h1>
          <p>Guess the word within 8 attempts to protect the 
          programming languages from Assembly!</p>

          {toggleBtn}
      </header>

      <section 
        aria-live="polite" 
        role="status" 
        className={gameStatusClassName}
      >
        {renderGameStatus()}
      </section>

      <section className="language-chips">
        {langElements}
      </section>

      <section key={currentWord} className={`word fade-in`}>
        {wordElements}
      </section>

      {/* Screen Reader Only*/}
      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ? 
          `Correct! The letter ${lastGuessedLetter} is in the word.` : 
          `Sorry, the letter ${lastGuessedLetter} is not in the word.`
          }
          You have {numGuessesLeft} attempts left.
        </p>

        <p>Current word: {currentWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}
        </p>
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {newGameBtn}
    </main>
  )
}

export default App
