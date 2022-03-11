const order = [];
const clickedOrder = [];
let score = 0;
let level = 1;

const red = document.querySelector('.red');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');

const scoreElement = document.querySelector('.score');
const levelElement = document.querySelector('.level');

const start = document.querySelector('.start-btn');

// Generate a random order of colors and highlight they
const generateOrder = () => {
  let randomNumber = Math.floor(Math.random() * 4);
  order[order.length] = randomNumber;

  clickedOrder.length = 0;

  for(let i in order) {
    let elementColor = getColorElement(order[i]);
    highlightColor(elementColor, Number(i) + 1);
  }

  clickableButtons(true);
}

// Highlight a color for a while and then take it back to normal
const highlightColor = (element, number) => {
  number = number * 700;
  setTimeout(() => {
    element.classList.add('selected');
  }, number - 450);

  setTimeout(() => {
    element.classList.remove('selected');
  }, number + 150);
}

// Return the button element name based on a number
const getColorElement = (color) => { 
  if(color == 0){
    return red;
  } else if(color == 1) {
    return green;
  } else if(color == 2) {
    return blue;
  } else if(color == 3) {
    return yellow;
  }
}

// Register the order of buttons clicked by the player and highlight the button
const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  
  highlightColor(getColorElement(color), 0.5);

  checkOrder();
}

// Compare the generated order with the clicked order and decide if the game goes to next level or is over.
const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] != order[i]) {
      gameOver();
      return;
    }
  }
  if(clickedOrder.length == order.length) {
    score++;
    alert(`Score: ${score}\nSuccess! Starting next level!`);
    nextLevel();
  }
}

// Update the status values displayed on screen and generate a new random order
const nextLevel = () => {
  ++level;

  updateStats();

  generateOrder();
}

let gameOver = () => {
  alert(`Score: ${score}!\nWrong order!\nClick "Start" to begin a new game!`);

  // colors click disabled until a new game is started
  clickableButtons(false);

  level = 1;
  
  updateStats();
}

// Disable/Enable the click event of the color buttons
const clickableButtons = (clickable) => {
  for(let i = 0; i < 4; i++) {
    if(clickable) {    
      getColorElement(i).classList.remove('blocked');
    } else {
      getColorElement(i).classList.add('blocked');
    }
  }
}

const updateStats = () => {
  scoreElement.innerHTML = `Score: ${score}`;
  levelElement.innerHTML = `Level: ${level}`;
}

// Resets everything and starts the new game
const playGame = () => {
  score = 0;
  level = 1;

  order.length = 0;
  clickedOrder.length = 0;

  updateStats();

  generateOrder();
}

red.onclick = () =>  click(0);
green.onclick = () =>  click(1);
blue.onclick = () =>  click(2);
yellow.onclick = () =>  click(3);

start.onclick = () => playGame();

// Start the game with the colors click disabled
clickableButtons(false);