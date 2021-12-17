var canvas,
  backGroundImage,
  craft1Image,
  craft2Image,
  groundImage,
  backGround,
  dushman,
  dushmanImage,
  craftD,
  dushmanGroup,
  loose,
  looseImage,
  banner,status1,status2,
  bannerImage;

var gameState = 0;
var CraftCount = 0;
var allPlayers;
var database;

var form, player, game;

var crafts, craft1, craft2;

function preload() {
  craft1Image = loadImage("images/rocket2.png");

  craft2Image = loadImage("images/rocket2.png");
  groundImage = loadImage("images/bg7.png");
  dushmanImage = loadImage("images/dushman.png");
  craftD = loadImage("images/rocket.png");
  craftD.scale = 0.1;
  looseImage = loadImage("images/banner2.png");
  winImage = loadImage("images/loose.png");
  bannerImage = loadImage("images/banner.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);

  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  dushmanGroup = new Group();
}

function draw() {
  if (CraftCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    clear();
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
}
function dushmanFun() {
  if (frameCount % 30 === 0) {
    dushman = createSprite(2000, Math.round(random(20, 970)), 10, 10);
    dushman.addImage(dushmanImage);
    dushman.velocityX = -5;
    dushman.lifetime = 950;
    dushman.scale = 0.3;
    dushmanGroup.add(dushman);
  }
}
