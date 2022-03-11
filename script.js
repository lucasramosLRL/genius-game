const order = [];
const clickedOrder = [];
let score = 0;
let level = 1;

const red = document.querySelector('.red');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');

const start = document.querySelector('.start-btn');

// Cria uma ordem aleatória de cores
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

const highlightColor = (element, number) => {
  number = number * 700;
  setTimeout(() => {
    element.classList.add('selected');
  }, number - 450);

  setTimeout(() => {
    element.classList.remove('selected');
  }, number + 150);
}

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

const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  
  highlightColor(getColorElement(color), 0.5);

  checkOrder();
}

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

const nextLevel = () => {
  ++level;

  generateOrder();
}

let gameOver = () => {
  alert(`Score: ${score}!\nWrong order!\nClick "Start" to begin a new game!`);

  clickableButtons(false);
}

clickableButtons = (clickable) => {
  for(let i = 0; i < 4; i++) {
    if(clickable) {    
      getColorElement(i).classList.remove('blocked');
    } else {
      getColorElement(i).classList.add('blocked');
    }
  }
}

const playGame = () => {
  score = 0;
  level = 1;

  order.length = 0;
  clickedOrder.length = 0;

  generateOrder();
}

red.onclick = () =>  click(0);
green.onclick = () =>  click(1);
blue.onclick = () =>  click(2);
yellow.onclick = () =>  click(3);

start.onclick = () => playGame();

clickableButtons(false);