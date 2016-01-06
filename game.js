// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Cheese1 image
var cheese1Ready = false;
var cheese1Image = new Image();
cheese1Image.onload = function () {
	cheese1Ready = true;
};
cheese1Image.src = "images/cheese1.png";

// Cheese2 image
var cheese2Ready = false;
var cheese2Image = new Image();
cheese2Image.onload = function () {
	cheese2Ready = true;
};
cheese2Image.src = "images/cheese2.png";


// Game Objects
var hero = {
  speed: 256, //movement in pixels per second
  x: canvas.width / 2,
  y: canvas.height / 2
};

var monster = {
  x: 0,
  y: 0,
  xSpeed: 0,
  ySpeed: 0
};

var cheese1 = {
  eaten: false,
  x: 0,
  y: 0,
};

var cheese2 = {
  eaten: false,
  x: 0,
  y: 0
}

var cheeseEaten = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener('keydown', function(e){
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {

  // Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 96));
  monster.y = 32 + (Math.random() * (canvas.height - 96));

  // Give monster random speed
  monster.xSpeed = Math.random() * 512 - 256;
  monster.ySpeed = Math.random() * 512 - 256;

  //Throw new cheeses on the screen randomly
  cheese1.x = 32 + (Math.random() * (canvas.width - 96));
  cheese1.y = 32 + (Math.random() * (canvas.height - 96));
  cheese1.eaten = false;

  cheese2.x = 32 + (Math.random() * (canvas.width - 96));
  cheese2.y = 32 + (Math.random() * (canvas.height - 96));
  cheese2.eaten = false;
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
  }

  // Keep hero in bounds
  hero.y = Math.max(32, hero.y);
  hero.y = Math.min(hero.y, (canvas.height - 64));

  hero.x = Math.max(32, hero.x);
  hero.x = Math.min(hero.x, (canvas.width - 64));

  // Move monster
  monster.x += monster.xSpeed * modifier;
  monster.y += monster.ySpeed * modifier;


  // Keep monster in bounds
  monster.y = Math.max(32, monster.y);
  monster.y = Math.min(monster.y, (canvas.height - 64));

  monster.x = Math.max(32, monster.x);
  monster.x = Math.min(monster.x, (canvas.width - 64));


  // Bounce monster off walls
  if (monster.x <= 32 || monster.x >= canvas.width - 64){
    monster.xSpeed *= -1;
  }

  if (monster.y <= 32 || monster.y >= canvas.height - 64){
    monster.ySpeed *= -1;
  }



  // Eat Cheeses?
  if (
    hero.x <= (cheese1.x + 32)
    && cheese1.x <= (hero.x + 32)
    && hero.y <= (cheese1.y + 32)
    && cheese1.y <= (hero.y + 32)
  ) {
    cheese1.eaten = true;
    cheese1.x = -32;
    cheese1.y = -32;
    ++cheeseEaten;
  }

  if (
    hero.x <= (cheese2.x + 32)
    && cheese2.x <= (hero.x + 32)
    && hero.y <= (cheese2.y + 32)
    && cheese2.y <= (hero.y + 32)
  ) {
    cheese2.eaten = true;
    cheese2.x = -32;
    cheese2.y = -32;
    ++cheeseEaten;
  }

  if (cheese1.eaten && cheese2.eaten) {
    reset();
  }
}


// Draw everything
var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
   if (heroReady) {
     ctx.drawImage(heroImage, hero.x, hero.y);
   }

   if (monsterReady) {
     ctx.drawImage(monsterImage, monster.x, monster.y);
   }

   if (cheese1Ready) {
     ctx.drawImage(cheese1Image, cheese1.x, cheese1.y);
   }

   if (cheese2Ready) {
     ctx.drawImage(cheese2Image, cheese2.x, cheese2.y);
   }

   // Score

   ctx.fillStyle = "rgb(250, 250, 250)";
   ctx.font = "24px Helvetica";
   ctx.textAlign = "left";
   ctx.textBaseline = "top";
   ctx.fillText("Cheese Eaten: " + cheeseEaten, 32, 32);
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  //Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame
  || w.webkitRequestAnimationFrame
  || w.msRequestAnimationFrame
  || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now()
reset();
main();
