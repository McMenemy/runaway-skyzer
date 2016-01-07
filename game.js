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

// Mouse images
var mouseReady1 = false;
var mouseImage1 = new Image();
mouseImage1.onload = function () {
	mouseReady1 = true;
};
mouseImage1.src = "images/mouse1.png";

var mouseReady2 = false;
var mouseImage2 = new Image();
mouseImage2.onload = function () {
	mouseReady2 = true;
};
mouseImage2.src = "images/mouse2.png";

var mouseReady3 = false;
var mouseImage3 = new Image();
mouseImage3.onload = function () {
	mouseReady3 = true;
};
mouseImage3.src = "images/mouse3.png";

//which image to show
var mouseImage = function(){
  //mouse not moving
  var image = mouseImage1;

  //mouse moving
  if (37 in keysDown
    || 38 in keysDown
    || 39 in keysDown
    || 40 in keysDown) {
      if ( (mouse.x + mouse.y) % 100 < 50 ) {
        image = mouseImage2;
      } else {
        image = mouseImage3;
      }
  }

  return image;
}



// Cat image
var catReady = false;
var catImage = new Image();
catImage.onload = function () {
	catReady = true;
};
catImage.src = "images/catLeft1.png";

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
var mouse = {
  speed: 256, //movement in pixels per second
  x: canvas.width / 2,
  y: canvas.height / 2
};

var cats = [];

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

var gameOver = false;

// Handle keyboard controls
var keysDown = {};

addEventListener('keydown', function(e){
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a cat
var reset = function () {

  // Throw the cat somewhere on the screen randomly
  if (cheeseEaten > 0){

    var cat = {
      // Give cat random speed
      xSpeed: Math.random() * 512 - 256,
      ySpeed: Math.random() * 512 - 256,

      x: 32 + (Math.random() * (canvas.width - 96)),
      y: 32 + (Math.random() * (canvas.height - 96)),

    };

    // make cat start from bushes

    if (cat.xSpeed > 0) {
      cat.x = -32;
    } else if (cat.xSpeed < 0) {
      cat.x = canvas.width;
    }

    cats.push(cat);

  }

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
    mouse.y -= mouse.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    mouse.y += mouse.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    mouse.x -= mouse.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    mouse.x += mouse.speed * modifier;
  }

  // Keep mouse in bounds
  mouse.y = Math.max(32, mouse.y);
  mouse.y = Math.min(mouse.y, (canvas.height - 60));

  mouse.x = Math.max(31, mouse.x);
  mouse.x = Math.min(mouse.x, (canvas.width - 59));

  // Move cats
  cats.forEach(function(cat){

    cat.x += cat.xSpeed * modifier;
    cat.y += cat.ySpeed * modifier;


    // Bounce cat off walls
    if (cat.x <= 32){
      cat.xSpeed = Math.abs(cat.xSpeed);
    } else if (cat.x >= canvas.width - 64){
      cat.xSpeed = 0 - Math.abs(cat.xSpeed);
    }

    if (cat.y <= 32){
      cat.ySpeed = Math.abs(cat.ySpeed);
    } else if (cat.y >= canvas.height - 64){
      cat.ySpeed = 0 - Math.abs(cat.ySpeed);
    }

    // Caught?
    if (
      mouse.x <= (cat.x + 32)
      && cat.x <= (mouse.x + 32)
      && mouse.y <= (cat.y + 32)
      && cat.y <= (mouse.y + 32)
    ) {
      gameOver = true;
    }

  });



  // Eat Cheeses?
  if (
    mouse.x <= (cheese1.x + 32)
    && cheese1.x <= (mouse.x + 32)
    && mouse.y <= (cheese1.y + 32)
    && cheese1.y <= (mouse.y + 32)
  ) {
    cheese1.eaten = true;
    cheese1.x = -32;
    cheese1.y = -32;
    ++cheeseEaten;
  }

  if (
    mouse.x <= (cheese2.x + 32)
    && cheese2.x <= (mouse.x + 32)
    && mouse.y <= (cheese2.y + 32)
    && cheese2.y <= (mouse.y + 32)
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

  //Background
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Cheese Eaten: " + cheeseEaten, 32, 32);

  //Objects
   if (mouseReady1 && mouseReady2 && mouseReady3) {
     ctx.drawImage(mouseImage(), mouse.x, mouse.y);
   }

   if (catReady) {
     cats.forEach(function(cat){
       ctx.drawImage(catImage, cat.x, cat.y);
     });
   }

   if (cheese1Ready) {
     ctx.drawImage(cheese1Image, cheese1.x, cheese1.y);
   }

   if (cheese2Ready) {
     ctx.drawImage(cheese2Image, cheese2.x, cheese2.y);
   }

};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  //Request to do this again ASAP if you aren't caught
  if (!gameOver) {
    requestAnimationFrame(main);
  }
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
