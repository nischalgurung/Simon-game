const buttonColours = ["red", "blue", "green", "yellow"];
const p = document.querySelector(".paragraph");
const h1 = document.querySelector("#level-title");
const body = document.querySelector("body");
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
document.addEventListener("keypress", function () {
  if (!started) {
    h1.textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  if (started === false) {
    button.addEventListener("click", function () {
      let userChosenColour = button.id;
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(button);
      checkAnswer(userClickedPattern.length - 1);
    });
  }
});

checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    body.classList.add("game-over");
    setTimeout(() => {
      body.classList.remove("game-over");
    }, 200);
    h1.textContent = "Game Over, Press Any Key To Restart The Game";
    startOver();
  }
};
function nextSequence() {
  userClickedPattern = [];
  level++;
  h1.textContent = `Level ${level}`;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  const button = document.querySelector(`#${randomChosenColour}`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
  playSound(randomChosenColour);
}

playSound = (name) => {
  let audio = new Audio(`./sounds/${name}.wav`);
  audio.play();
};
animatePress = (currentColour) => {
  currentColour.classList.add("pressed");
  setTimeout(() => {
    currentColour.classList.remove("pressed");
  }, 100);
};

startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
