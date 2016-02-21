// Create the canvas
(function(){
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

// document.body.appendChild(canvas);

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "background.png";

// Mouse images
var mouseReady1 = false;
var mouseImage1 = new Image();
mouseImage1.onload = function () {
	mouseReady1 = true;
};
mouseImage1.src = "skyeDog.png";

var mouseReady2 = false;
var mouseImage2 = new Image();
mouseImage2.onload = function () {
	mouseReady2 = true;
};
mouseImage2.src = "skyeDog.png";

var mouseReady3 = false;
var mouseImage3 = new Image();
mouseImage3.onload = function () {
	mouseReady3 = true;
};
mouseImage3.src = "skyeDog.png";

//which image to show
var mouseImage = function(){
  //mouse not moving
  var image = mouseImage1;

  //mouse moving
  if (37 in keysDown
    || 38 in keysDown
    || 39 in keysDown
    || 40 in keysDown) {
      if ( (mouse.x + mouse.y) % 150 < 75 ) {
        image = mouseImage2;
      } else {
        image = mouseImage3;
      }
  }

  return image;
}



// Cat images
var totoroReady = false;
var totoro = new Image();
totoro.onload = function () {
	totoroReady = true;
};
totoro.src = "totoro.png";

var totorofatReady = false;
var totorofat = new Image();
totorofat.onload = function () {
	totorofatReady = true;
};
totorofat.src = "totorofat.png";

var totoroReady = false;
var totoro = new Image();
totoro.onload = function () {
	totoroReady = true;
};
totoro.src = "totoro.png";

var totorofatReady = false;
var totorofat = new Image();
totorofat.onload = function () {
	totorofatReady = true;
};
totorofat.src = "totorofat.png";

// Which cat to show
var catImage = function(cat){
  var image;
  if (cat.xSpeed <= 0){ //Cat moving to the left
    if ( (cat.x + cat.y) % 100 < 50 ) {
      image = totoro;
    } else {
      image = totorofat;
    }
  } else { //Cat moving to the right
    if ( (cat.x + cat.y) % 100 < 50 ) {
      image = totoro;
    } else {
      image = totorofat;
    }
  }
  return image;
};

// appleRed image
var appleRedReady = false;
var appleRedImage = new Image();
appleRedImage.onload = function () {
	appleRedReady = true;
};
appleRedImage.src = "appleRed.png";

// appleGreen image
var appleGreenReady = false;
var appleGreenImage = new Image();
appleGreenImage.onload = function () {
	appleGreenReady = true;
};
appleGreenImage.src = "appleGreen.png";


// Game Objects
var mouse = {
  speed: 256, //movement in pixels per second
  x: canvas.width / 2,
  y: canvas.height / 2
};

var cats = [];

var appleRed = {
  eaten: false,
  x: 0,
  y: 0,
};

var appleGreen = {
  eaten: false,
  x: 0,
  y: 0
};

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
      xSpeed: Math.random() * 480 - 240,
      ySpeed: Math.random() * 480 - 240,

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
  appleRed.x = 32 + (Math.random() * (canvas.width - 96));
  appleRed.y = 32 + (Math.random() * (canvas.height - 96));
  appleRed.eaten = false;

  appleGreen.x = 32 + (Math.random() * (canvas.width - 96));
  appleGreen.y = 32 + (Math.random() * (canvas.height - 96));
  appleGreen.eaten = false;
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
      mouse.x <= (cat.x + 26)
      && cat.x <= (mouse.x + 26)
      && mouse.y <= (cat.y + 22)
      && cat.y <= (mouse.y + 22)
    ) {
      gameOver = true;
    }

  });



  // Eat Cheeses?
  if (
    mouse.x <= (appleRed.x + 32)
    && appleRed.x <= (mouse.x + 32)
    && mouse.y <= (appleRed.y + 32)
    && appleRed.y <= (mouse.y + 32)
  ) {
    appleRed.eaten = true;
    appleRed.x = -32;
    appleRed.y = -32;
    ++cheeseEaten;
  }

  if (
    mouse.x <= (appleGreen.x + 32)
    && appleGreen.x <= (mouse.x + 32)
    && mouse.y <= (appleGreen.y + 32)
    && appleGreen.y <= (mouse.y + 32)
  ) {
    appleGreen.eaten = true;
    appleGreen.x = -32;
    appleGreen.y = -32;
    ++cheeseEaten;
  }

  if (appleRed.eaten && appleGreen.eaten) {
    reset();
  }

  //Check for Cheaters
  if (canvas.width !== 512 || canvas.height !== 480) {

    var cat = {
      // Give cat random speed
      xSpeed: Math.random() * 480 - 240,
      ySpeed: Math.random() * 480 - 240,

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

};


// Draw everything
var render = function() {

  //Background
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Mouse Memoirs";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  // Add Kerning
  var ctext = ("Apples Eaten: " + cheeseEaten).split("").join(String.fromCharCode(8202));
  ctx.fillText(ctext, 32, 32);

  //Objects
   if (mouseReady1 && mouseReady2 && mouseReady3) {
     ctx.drawImage(mouseImage(), mouse.x, mouse.y);
   }

   if (totoroReady && totorofatReady && totorofatReady && totoroReady) {
     cats.forEach(function(cat){
       ctx.drawImage(catImage(cat), cat.x, cat.y);
     });
   }

   if (appleRedReady) {
     ctx.drawImage(appleRedImage, appleRed.x, appleRed.y);
   }

   if (appleGreenReady) {
     ctx.drawImage(appleGreenImage, appleGreen.x, appleGreen.y);
   }

};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  //cap delta at 15 to prevent cats from escaping if window switches.
  if (delta > 1000) {
    delta = 15;
  }

  update(delta / 1000);
  render();

  then = now;

  //Request to do this again ASAP if you aren't caught
  if (!gameOver) {
    requestAnimationFrame(main);
  } else {
    // Game Over Message
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "48px Mouse Memoirs";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("GAME OVER!!!     " + cheeseEaten, canvas.width / 2, 250);


    //put Score into form, make form visible, and focus on name input
    document.getElementById('scoreInput').value = cheeseEaten;
    document.getElementById('score').innerHTML = cheeseEaten;
    document.getElementById('submitmodal').removeAttribute('hidden');
    $('#submitname').focus();
    // replay in 3 seconds
    // setTimeout(function(){
    //   document.location.reload();
    // }, 3000 )
  }
};

// Function to get user score
var getScore = function(){
  //insure user didn't cheat
  return Math.min(cheeseEaten, cats.length * 2 + 1);
};

//put actual score in the form to prevent user manually entering score
//remove once submit is clicked to prevent double entry
$("#submitform").submit(function(){
  document.getElementById('scoreInput').value = getScore();
  $('#submitmodal').attr('hidden', true);
  return true;
});

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame
  || w.webkitRequestAnimationFrame
  || w.msRequestAnimationFrame
  || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
})();
