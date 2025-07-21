// Setting Game  Name
let gameName = "Guess The Word";
document.querySelector("h1").innerHTML = gameName;
document.title = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Made With Love By Abdallah`;

// generate random words
let wordToGuess = "";
let words = [
  "Fatema",
  "Mariam",
  "Hassan",
  "Nermin",
  "Hadeer",
  "Salmaa",
  "Yasmin",
  "Yousef",
  "Khaled",
  "Ashraf",
  "Zahraa",
  "Nesmaa",
  "Nagwah",
  "Latifa",
  "Maloka",
  "Faroha",
  "Mahmod",
  "Shawky",
  "Yousry",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Setting Option
let numberOfTries = 6;
let numberOfLitters = 6;
let currentTry = 1;
let numberOfHints = 2;

function generateTries() {
  const inputsContiner = document.querySelector(".inputs");
  console.log(wordToGuess);
  // generate the div of inputs
  for (let i = 1; i <= numberOfTries; i++) {
    const myDiv = document.createElement("div");
    myDiv.classList.add(`Try-${i}`);
    myDiv.innerHTML = `<span>Try ${i} </span>`;

    if (i !== 1) myDiv.classList.add("disabled");
    // generate the inputs filed
    for (let j = 1; j <= numberOfLitters; j++) {
      const myInputs = document.createElement("input");
      myInputs.type = "text";
      myInputs.setAttribute("maxLength", "1");
      myInputs.id = `try-${i}-letter-${j}`;
      myDiv.appendChild(myInputs);
    }
    inputsContiner.appendChild(myDiv);
  }
  inputsContiner.children[0].children[1].focus();
  // disabled inputs
  const disabledDiv = document.querySelectorAll(".disabled input");
  disabledDiv.forEach((element) => {
    element.disabled = true;
  });
  // some of feature of inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      let nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      let currentIndex = Array.from(inputs).indexOf(this); // or document.activeElement ==> this
      if (event.key === "ArrowRight") {
        let nextIndx = currentIndex + 1;
        if (nextIndx < inputs.length) inputs[nextIndx].focus();
      }
      if (event.key === "ArrowLeft") {
        let prevIndx = currentIndex - 1;
        if (prevIndx >= 0) inputs[prevIndx].focus();
      }
    });
  });
}

// (guess buttom) come with the input letter and compare with the rondom letter
let checkInput = document.querySelector(".check");
checkInput.addEventListener("click", checkTheWord);

function checkTheWord() {
  let success = true;
  for (let i = 1; i <= numberOfLitters; i++) {
    let inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
    let letter = inputField.value.toLowerCase();
    let acctualLetter = wordToGuess[i - 1];
    // game logic
    if (letter === acctualLetter) {
      inputField.classList.add("inspace");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("inspace-non");
      success = false;
    } else if (
      (letter !== acctualLetter && !wordToGuess.includes(letter)) ||
      letter === ""
    ) {
      inputField.classList.add("no");
      success = false;
    }
  }
  // print message if you win or lose
  if (success) {
    messageArea.innerHTML = `Congratulation! You Win in ${currentTry} Tries <span>${wordToGuess}</span>`;
    if (numberOfHints == 2)
      messageArea.innerHTML = `Great You Didn't Use Hints And Win in ${currentTry} Tries <span>${wordToGuess}</span>`;
    document.querySelector(".suc").play();
    let disabledAllDiv = document.querySelectorAll(`.inputs > div `);
    disabledAllDiv.forEach((div) => {
      div.classList.add("disabled");
    });
    checkInput.disabled = true;
    buttomHint.disabled = true;
  } else {
    document.querySelector(`.Try-${currentTry}`).classList.add("disabled");
    let currentOfTry = document.querySelectorAll(`.Try-${currentTry} input`);
    currentOfTry.forEach((input) => {
      input.disabled = true;
    });

    currentTry++;

    let nextOfTry = document.querySelectorAll(`.Try-${currentTry} input`);
    nextOfTry.forEach((input) => {
      input.disabled = false;
    });

    let e1 = document.querySelector(`.Try-${currentTry}`);
    if (e1) {
      document.querySelector(`.Try-${currentTry}`).classList.remove("disabled");
      e1.children[1].focus();
    } else {
      checkInput.disabled = true;
      buttomHint.disabled = true;
      messageArea.innerHTML = `Game Over, Sorry! You Lose The Word Is <span>${wordToGuess}</span>`;
      document.querySelector(".fail").play();
    }
  }
}

// manage a hint buttom

document.querySelector(".hint span").innerHTML = numberOfHints;
let buttomHint = document.querySelector(".hint");
buttomHint.addEventListener("click", function () {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    buttomHint.disabled = true;
  }
  let notDisabled = document.querySelectorAll("input:not([disabled])");
  let emptyInput = Array.from(notDisabled).filter(
    (input) => input.value === ""
  );
  if (emptyInput.length > 0) {
    const randomIndix = Math.floor(Math.random() * emptyInput.length);
    const randomInput = emptyInput[randomIndix];
    const indexToFill = Array.from(notDisabled).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
});

// handle backspace buttom
document.addEventListener("keydown", function (event) {
  const inpts = document.querySelectorAll("input:not([disabled])");
  if (event.key === "Backspace") {
    let indexCurrent = Array.from(inpts).indexOf(document.activeElement);
    if (indexCurrent > 0) {
      let currentInput = inpts[indexCurrent];
      let prevInput = inpts[indexCurrent - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
});

// buttom try again
let btn = document.querySelector(".again");
btn.addEventListener("click", function () {
  window.location.reload();
});

window.addEventListener("DOMContentLoaded", function () {
  generateTries();
});
