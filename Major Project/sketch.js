// Major Project
// Pouya Pourhaj && Jienan Chen
// June 20, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state;

//Button related global variables(by Pouya)
let buttonText = ["Spasky", "Charter"];
let difficulty = ["Spasky", "Charter"];
let buttonAndTextPlacement = [3, 6];
let buttonX, buttonY, buttonWidth, buttonHeight;
let size;
let startButtonX, startButtonY, startButtonWidth, startButtonHeight;
let clicked = false;

//Instructions related global variables (by Jienan)
let instructionText = ["1. Select one of the two modes.", "2. Find the enemies by clicking on the grid.","3. If you desire to change modes, click r."];
let instructionPlacement = [130, 160, 190];


//Grid related global variables (adapted by Jienan)
let gridSize;
let grid;
let cellSize;
let gridsDrawn;

//Sounds related global variables(by Jienan)
//Spasky sounds
let sLoss1, sLoss2, sLoss3, sLoss4, sLoss5;
let sWin1, sWin2, sWin3;

//Charter sounds
let cLoss1, cLoss2, cLoss3, cLoss4, cLoss5, cLoss6;
let cWin1, cWin2;

//Counter system (By Pouya)
let turnCounterSpasky;
let turnCounterCharter;

function preload(){

  //ensures audio compatibility
  soundFormats("wav","m4a");

  //Sounds to be played in the Spasky mode when Blaviken is not found
  sLoss1 = loadSound("assets/MuhammadLoss1.m4a");
  sLoss2 = loadSound("assets/MuhammadLoss2.m4a");
  sLoss3 = loadSound("assets/MuhammadLoss3.m4a");
  sLoss4 = loadSound("assets/MuhammadLoss4.m4a");
  sLoss5 = loadSound("assets/MuhammadLoss5.m4a");
  
  //Otherwise, in Spasky mode
  sWin1 = loadSound("assets/MuhammadVictory1.m4a");
  sWin2 = loadSound("assets/MuhammadVictory2.m4a");
  sWin3 = loadSound("assets/MuhammadVictory3.m4a");
  
  //Sounds to be played in the Charter mode when Blaviken is not found
  cLoss1 = loadSound("assets/charterLoss1.m4a");
  cLoss2 = loadSound("assets/charterLoss2.m4a");
  cLoss3 = loadSound("assets/charterLoss3.m4a");
  cLoss4 = loadSound("assets/charterLoss4.m4a");
  cLoss5 = loadSound("assets/charterLoss5.m4a");
  cLoss6 = loadSound("assets/charterLoss6.wav");
  
  //Otherwise, in Charter mode
  cWin1 = loadSound("assets/charterWin1.m4a");
  cWin2 = loadSound("assets/charterWin2.m4a");
}

function setup() {
  //Screen for the grid(by Pouya)
  if (windowWidth > windowHeight){
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  
  //Setting the mode(by Pouya)
  state = 1;
  
  //Setting text location on the buttons(by Pouya)
  rectMode(CENTER);
  textAlign(CENTER);

  //Setting up the grid(by Jienan)
  grid = placeEnemies(gridSize, gridSize);
  gridSize = 0;
  cellSize = 0;

  //Assigning start menu button values(by Pouya)
  startButtonX = width / 2;
  startButtonY = height / 2;
  startButtonWidth = 250;
  startButtonHeight = 125;

  //Introduction menu button placement/values(by Pouya)
  buttonX = width / 2;
  buttonY = height / 8;
  buttonWidth = width / 2;
  buttonHeight = (height / 2 - 10) / 2;
  size = (height / 2 - 10) / 4;
  gridsDrawn = 0;

  //Counter values for charter and spasky mode (by Pouya)
  turnCounterSpasky = 3;
  turnCounterCharter = 5;
}

function draw() {
  //Displays the appropriate images on the screen depending on the mode(by Pouya, fixed by Jienan)
  if (state === 1){    
    loadStartScreen();
    writeInstructions();
  }
  if (state === 2) {
    introductionMenu();
  }
  if (state === 3){
    choosingDifficulty();
  }
  if (state === "Spasky"){
    gridSize = 3;
    if (gridsDrawn===0) {
      grid = placeEnemies(gridSize, gridSize);
      displayGrid();
      gridsDrawn = 1;
    }
  }
  if (state === "Charter"){
    gridSize = 8;
    if (gridsDrawn === 0){
      grid = placeEnemies(gridSize, gridSize);
      displayGrid();
      gridsDrawn = 1;
    }
  }
}

function loadStartScreen(){
  //display a large button on which is printed "start" (adapted by Pouya from Jienan's Le Chartier Project, fixed by Jienan)
  textAlign(CENTER);
  textSize((floor(height / 2) - 10) / 5);
  background("brown");
  fill("white");
  stroke("grey");
  rect(startButtonX, startButtonY, startButtonWidth, startButtonHeight);
  strokeWeight(3);
  stroke("black");
  text("Start", startButtonX, startButtonY);
  textSize(startButtonWidth / 5, startButtonHeight / 5);
  if (clickedOnStartButton() && clicked) {
    state = 2;
  }
}

function writeInstructions(){
  //Writes out instructions (temporary ones) beneath the start button (by Jienan)
  textAlign(LEFT);
  textSize (height * 0.045);
  fill(255);
  for (let i = 0; i< instructionText.length; i++){
    text(instructionText[i], 23, height/2 + instructionPlacement[i]);
  } 
}

function clickedOnStartButton(){
  //Detects whether or not the mouse is within the boundaries of the 'start" button (by Pouya)
  return mouseX >= startButtonX - startButtonWidth / 2 &&
    mouseX <= startButtonX + startButtonWidth / 2 &&
    mouseY >= startButtonY - startButtonHeight / 2 &&
    mouseY <= startButtonY + startButtonHeight / 2;
}

function introductionMenu() {
  background("beige");
  fill("red");
  textMode(CENTER);
  text("Welcome to La Redmption \n There are two grids where Spasky is the easy mode and Charter is the hard mode \n In each column there is a Blaviken which you have to find in oder to succeed, however, be careful as you only have 3 turns in Spasky and 5 in Charter for each single Blaviken \n Once you find a Blaviken you will be challenged in two different was by either going to his lair or tagging him \n Which ever game you choose beware that the world will go on fire shall you fail");

}

function choosingDifficulty(){
  //Sets up the background and other settings for the menu page with two modes(by Pouya, edited by Jienan)
  textAlign(CENTER);
  background("black");
  fill("white");
  stroke("red");
  strokeWeight(3);
  drawButtons();
}

function drawButtons(){
  //Draws two buttons, on which are the names of the modes(adapted by Pouya from Jienan's Le Chartier Project)
  textSize(size);
  for (let i = 0; i < buttonAndTextPlacement.length; i++) {
    rect(buttonX, buttonAndTextPlacement[i] * buttonY, buttonWidth, buttonHeight);
    text(buttonText[i], buttonX, buttonAndTextPlacement[i] * buttonY);
  }
}

function displayGrid(){
  //Displays the grids(adapted by Jienan from Mr. Schellenberg's Game of Life Demo) 
  cellSize=width/gridSize;
  rectMode(CORNER);
  stroke(0);
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) { 
      if (grid[y][x] === 0 || grid[y][x] === 1){
        fill(255);
      }
      else {
        fill(0);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function placeEnemies(cols, rows){
  //Responsible for furnishing displayGrid() with info, and also where to place the Blavikens(adapted by Jienan from Mr. Schellenberg's Game of Life Demo) 
  let blackCols = [];
  let free = [];
  let emptyArray = [];
  
  for (let h = 0; h < gridSize; h++){
    //Controls the number of Blavikens placed randomly
    free.push([h]);
  }
  for (let i = 0; i < rows; i++){
    emptyArray.push([]);
    let choice = random(free);
    while (blackCols.includes(choice)){
      choice = random(free);
    }
    for (let j = 0; j < cols; j++){
      // eslint-disable-next-line eqeqeq
      if (j == choice) {
        emptyArray[i].push(1);
      }
      else {
        emptyArray[i].push(0);
      }
    }
    //Works with free to moderate number of Blavikens
    blackCols.push(choice);
  }
  //returns the necessary info for the grids to be drawn properly
  return emptyArray;
}

function playSpaskyLossSound(){
  //When no Blaviken is found in the Spasky mode(by Jienan)
  let choices = [1, 2, 3, 4, 5];
  // eslint-disable-next-line no-undef
  choice = random(choices);
  // eslint-disable-next-line no-undef
  if (choice === 1){
    sLoss1.setVolume(0.3);
    sLoss1.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 2){
    sLoss2.setVolume(0.3);
    sLoss2.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 3){
    sLoss3.setVolume(0.3);
    sLoss3.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 4){
    sLoss4.setVolume(0.3);
    sLoss4.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 5){
    sLoss5.setVolume(0.3);
    sLoss5.play();
  }
}

function playCharterLossSound(){
  //When no Blaviken is found in the Charter mode(by Jienan)
  let choices = [1,2,3,4,5,6];
  // eslint-disable-next-line no-undef
  choice = random(choices);
  // eslint-disable-next-line no-undef
  if (choice === 1){
    cLoss1.setVolume(0.3);
    cLoss1.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 2){
    cLoss2.setVolume(0.3);
    cLoss2.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 3){
    cLoss3.setVolume(0.3);
    cLoss3.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 4){
    cLoss4.setVolume(0.3);
    cLoss4.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 5){
    cLoss5.setVolume(0.3);
    cLoss5.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 6){
    cLoss6.setVolume(0.3);
    cLoss6.play();
  }
}

function playSpaskyWinSound(){
  //When Blaviken is found in the Spasky mode(by Jienan)
  let choices = [1, 2, 3];
  // eslint-disable-next-line no-undef
  choice = random(choices);
  // eslint-disable-next-line no-undef
  if (choice === 1){
    sWin1.setVolume(0.5);
    sWin1.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 2){
    sWin2.setVolume(0.5);
    sWin2.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 3){
    sWin3.setVolume(1.0);
    sWin3.play();
  }
}

function playCharterWinSound(){
  //When Blaviken is found in the Charter mode(by Jienan)
  let choices = [1, 2];
  // eslint-disable-next-line no-undef
  choice = random(choices);
  // eslint-disable-next-line no-undef
  if (choice === 1){
    cWin1.setVolume(1.0);
    cWin1.play();
  }
  // eslint-disable-next-line no-undef
  else if (choice === 2){
    cWin2.setVolume(1.0);
    cWin2.play();
  }
}

function stopAllSounds(){
  //Stops the sounds(by Jienan)

  //Spasky loss sounds
  sLoss1.stop();
  sLoss2.stop();
  sLoss3.stop();
  sLoss4.stop();
  sLoss5.stop();
  //Spasky win sounds
  sWin1.stop();
  sWin2.stop();
  sWin3.stop();
  //Charter loss sounds
  cLoss1.stop();
  cLoss2.stop();
  cLoss3.stop();
  cLoss4.stop();
  cLoss5.stop();
  cLoss6.stop();
  //Charter win sounds
  cWin1.stop();
  cWin2.stop();
}

function mousePressed() {
  //Changing states during the mode selection page(adapted by Pouya from Jienan's Le Chartier Project)
  clicked = true;
  cellSize = width/gridSize;
  let xcoord = floor(mouseX / cellSize);
  let ycoord = floor(mouseY / cellSize);
  if (state === 2) {
    for (let i = 0; i < buttonAndTextPlacement.length; i++) {
      if (mouseX > buttonX - buttonWidth / 2 & mouseX < buttonX + buttonWidth / 2 & mouseY > buttonAndTextPlacement[i] * buttonY - buttonHeight / 2 & mouseY < buttonAndTextPlacement[i] * buttonY + buttonHeight / 2){
        
        state = difficulty[i];
      }
    }
  }
  //Playing and stopping the playing of sounds according to the modes (Spasky and Charter) and displaying Blaviken when he is found (adapted by Jienan from Mr. Schellenberg's Game of Life Demo)
  if  (gridsDrawn===1){
    if (state === "Spasky" && grid[ycoord][xcoord] === 1 ) {
      stopAllSounds();
      playSpaskyWinSound();
      grid[ycoord][xcoord] = 2;
      displayGrid();
      turnCounterSpasky = 3;
      if (turnCounterSpasky === 0) {
        gameOver();
      }
    } 
    else if (state === "Spasky" && grid[ycoord][xcoord] === 0){
      stopAllSounds();
      playSpaskyLossSound();
      turnCounterSpasky = turnCounterSpasky - 1;
      if (turnCounterSpasky === 0) {
        gameOver();
      }
    }
    else if (state === "Charter" && grid[ycoord][xcoord] === 1 ) {
      stopAllSounds();
      playCharterWinSound();
      grid[ycoord][xcoord] = 2;
      displayGrid();
      turnCounterCharter = 5;
      if (turnCounterCharter === 0) {
        gameOver();
      }
    }
    else if (state === "Charter" && grid[ycoord][xcoord] === 0){
      stopAllSounds();
      playCharterLossSound();
      turnCounterCharter = turnCounterCharter - 1;
      if (turnCounterCharter === 0) {
        gameOver();
      }
    }
  }
}

function keyPressed() {
  if ((state === "Spasky" || state === "Charter") && (key === "r" || key === "R" )){
    gridsDrawn = 0;
    state = 2;
    rectMode(CENTER);
    textAlign(CENTER);
    stopAllSounds();      
  }
}

function gameOver() {
  gridsDrawn = 0;
  state = 2;
  rectMode(CENTER);
  textAlign(CENTER);
  stopAllSounds(); 
}

