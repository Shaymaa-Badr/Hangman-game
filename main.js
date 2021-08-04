const worngLettersEl = document.querySelector("#wrong-letters"),
  wordEl = document.querySelector("#word"),
  popup = document.querySelector("#popup-container"),
  finalMsg = document.querySelector("#final-msg"),
  finalMsgRevealWord = document.querySelector("#final-word"),
  playBtn = document.querySelector("#play-btn"),
  notification = document.querySelector("#notification-container"),
  figureParts = document.querySelectorAll(".figure-part");

const words = [
  "programming",
  "wizerd",
  "interface",
  "JavaScript",
  "paython",
  "developing",
  "frontend",
  "backend",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>`
      )
      .join("")}
  `;
  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    finalMsg.innerText = "Congratulations! You won! 😃";

    popup.style.display = "flex";

    playable = false;
  }
}

// Update wrong letters
function updateWorngLetterEl() {
  // Display wrong letters
  worngLettersEl.innerHTML = `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map(
    (letter) => `
  <span>${letter}</span>`
  )}`;
  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check losing
  if (wrongLetters.length === figureParts.length) {
    finalMsg.innerText = "Unfortunately you lost.😕";
    finalMsgRevealWord.innerText = `... the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Window Keydown letter press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWorngLetterEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

playBtn.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWorngLetterEl();
  popup.style.display = "none";
});
displayWord();
