

//assigning variables
let hangmanImg = document.querySelector(".hangman img");
let keyboard = document.querySelector(".keyboard");
let wordDisplay = document.getElementById("wordDisplay");
let WrongGuessText = document.getElementById("wrongCount");
let gameModal = document.querySelector(".game-modal");
let playAgainBtn = document.querySelector(".play-again");
let currentWord;
let wrongGuessCount = 0;
let maxGuess = 6;
let correLetters = [];

const resetGame = () => {
  correLetters = [];
  wrongGuessCount = 0;
  hangmanImg.src = `hangman-${wrongGuessCount}.svg`;
  WrongGuessText.innerText = `${wrongGuessCount} / ${maxGuess}`;
  keyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => ` <li></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(word);
  currentWord = word;
  document.querySelector(".hint span").innerText = hint;
  resetGame();
  wordDisplay.innerHTML = word
    .split("")
    .map(() => ` <li></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You Found The Word:`
      : `The Correct Word Was`;
    gameModal.querySelector("img").src = `${
      isVictory ? `victory` : `lost`
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? `congratulations` : `game over!`
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  });
};

const initGame = (button) => {
  const clickedLetter = button.innerText;
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImg.src = `hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  WrongGuessText.innerText = `${wrongGuessCount} / ${maxGuess}`;

  if (wrongGuessCount === maxGuess) return gameOver(false);
  if (correLetters.length === currentWord.length) return gameOver(true);
};

//creating keys of keyboard
for (i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
