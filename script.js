////Modules and word fetch
import { wordGetter } from "./wordFetch.js";
let wordToGuess = await wordGetter();
console.log(wordToGuess); // check console for cheatcode

//// DOM Elements
const inputBoxes = document.querySelectorAll(".textbox");
const enterBtn = document.querySelector(".btn");
const gameBox = document.querySelectorAll(".inputRow");
const alertBtn = document.querySelector(".btnAlert");
// console.log(gameBox);
let currentRow = 1;

// console.log(inputBoxes);

///// Getting Boxes in a specific row
function getCurrentRowBoxes() {
  return document.querySelectorAll(`.inputBoxes${currentRow} .textbox`);
}
let currentRowBoxes = getCurrentRowBoxes(currentRow);

/////////Handling Keypress and Input Focus
function focusShift() {
  if (currentRow <= 6) {
    currentRowBoxes[0].focus();
  }
  currentRowBoxes.forEach((element, index) => {
    element.addEventListener("keyup", function ({ key }) {
      //   console.log(key);
      if (index < currentRowBoxes.length - 1 && key !== "Backspace") {
        currentRowBoxes[index + 1].focus();
      } else if (index > 0 && key === "Backspace") {
        currentRowBoxes[index - 1].focus();
      } else {
        element.blur();
      }
    });
  });
}
focusShift();

// enterBtn.addEventListener("click", function () {
//   //   if (currentRow === 6) {
//   //     document.querySelector(".gameBoard").classList.add("filter");
//   //   }
//   //   console.log("working");
//   let wordArr = [];
//   Array.from(currentRowBoxes).map((box) => wordArr.push(box.value));
//   const wordGuessed = wordArr.join("");
//   //   console.log(`The word you guessed is ${wordGuessed}`);
//   if (wordGuessed.length === 5) {
//     finalBlur(wordGuessed);
//     validator(wordGuessed);
//     currentRowBoxes.forEach((box) => (box.disabled = true));
//     currentRow++;
//     currentRowBoxes = getCurrentRowBoxes(currentRow);
//     enableCurrentRow();
//     focusShift();
//     finalBlur(wordGuessed);
//   }
// });

// window.addEventListener("keyup", function ({ key }) {
//   //   console.log(key);
//   if (key === "Enter") {
//     if (currentRow === 6) {
//       document.querySelector(".gameBoard").classList.add("filter");
//     }
//     // console.log("working");
//     let wordArr = [];
//     Array.from(currentRowBoxes).map((box) => wordArr.push(box.value));
//     const wordGuessed = wordArr.join("");
//     // console.log(`The word you guessed is ${wordGuessed}`);
//     validator(wordGuessed);

//     currentRowBoxes.forEach((box) => (box.disabled = true));
//     currentRow++;
//     currentRowBoxes = getCurrentRowBoxes(currentRow);
//     enableCurrentRow();
//     focusShift();
//     finalBlur(wordGuessed);
//   }
// });
function inputSubmission() {
  let wordArr = [];
  Array.from(currentRowBoxes).map((box) => wordArr.push(box.value));
  const wordGuessed = wordArr.join("");
  if (wordGuessed.length === 5) {
    // finalBlur(wordGuessed);
    validator(wordGuessed);
    currentRowBoxes.forEach((box) => (box.disabled = true));
    currentRow++;
    currentRowBoxes = getCurrentRowBoxes(currentRow);
    enableCurrentRow();
    focusShift();
    finalBlur(wordGuessed);
  }
}

/// Confirming Input
enterBtn.addEventListener("click", inputSubmission);
window.addEventListener("keyup", function ({ key }) {
  if (key === "Enter") inputSubmission();
});

////// Final State
function finalBlur(word) {
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
  if (word === wordToGuess) {
    document.querySelector(".gameBoard").classList.add("filter");
    document.querySelector(".alertBox").classList.remove("hidden");
    document.querySelector(".btn").classList.add("hidden");
    document.querySelector("body").classList.add("bcg-correct");
    document.querySelector(".alertBox").classList.add("bounce");

    document.querySelector(
      ".text"
    ).innerHTML = `You guessed it right - ${wordToGuess.toUpperCase()} <br> You're HIM!👊🏿`;
    inputBoxes.forEach((box) => {
      box.disabled = true;
    });
  } else if (currentRow > 6 && word !== wordToGuess) {
    document.querySelector(".gameBoard").classList.add("filter");
    document.querySelector(".alertBox").classList.remove("hidden");
    document.querySelector(".alertBox").classList.add("bounce");
    document.querySelector(".btn").classList.add("hidden");
    document.querySelector("body").classList.add("bcg-wrong");
    document.querySelector(".text").style.color = "#e63946";
    document.querySelector(
      ".text"
    ).innerHTML = `Game Over! <br> The correct word was: ${wordToGuess.toUpperCase()}`;
    inputBoxes.forEach((box) => {
      box.disabled = true;
    });
  }
}

//// Word Validator (check console for guide)
function validator(word) {
  const wordArr = word.split("");
  wordArr.forEach((letter, index) => {
    if (wordArr[index].toLowerCase() === wordToGuess[index]) {
      console.log(`${wordArr[index].toUpperCase()} is in the right spot`);
      currentRowBoxes[index].classList.add("correct", "flip");
    } else if (
      wordArr[index].toLowerCase() !== wordToGuess[index] &&
      wordToGuess.includes(wordArr[index])
    ) {
      console.log(`${wordArr[index].toUpperCase()} is not in the right spot`);
      currentRowBoxes[index].classList.add("present", "flip");
    } else {
      console.log(`The Word doen't contain ${wordArr[index].toUpperCase()}`);
      currentRowBoxes[index].classList.add("absent", "flip");
    }
  });
}

//// Row disabler and enabler
function init() {
  inputBoxes.forEach((row) => (row.disabled = true));
  currentRowBoxes.forEach((boxes) => (boxes.disabled = false));
}
init();

function enableCurrentRow() {
  currentRowBoxes.forEach((box) => {
    box.disabled = false;
    box.value = "";
  });
}

//  reset game
alertBtn.addEventListener("click", function () {
  location.reload();
});



