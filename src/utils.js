import { normalWords, techWords } from "./words"

let currentWordList = normalWords

export function setWordList(type) {
  currentWordList = type === "tech" ? techWords : normalWords
}

export function getWordListType() {
  return currentWordList === techWords ? "tech" : "normal"
}

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * currentWordList.length);
    return currentWordList[randomIndex];
}

export function getFarewellText(language) {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}