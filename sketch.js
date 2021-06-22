var PLAY = 1;
var END = 0;
var gameState = PLAY;

var alien,alienImg;
var path,pathImg;
var invground;
var obstacleImg,obstacleGroup;
var gameover,gameoverImg;

function preload(){
alienImg=loadAnimation("alien1.png","alien2.png");
pathImg=loadImage("path.png");
alienjump=loadImage("alienjump.png");
gameoverImg=loadImage("gameover.png");  
}

function setup() {
 createCanvas(windowWidth,windowHeight);
  path=createSprite(10,height-1180);
  path.addImage("path",pathImg);
  path.scale=10.5;
  
  
  obstacleImg=loadImage("obstacle.png");
  
  gameover=createSprite(height-50,200,20,20)
  gameover.addImage("gameover",gameoverImg);
  gameover.scale=1.8;
  
  invground=createSprite(50,height-300,600,10);
  invground.visible=false;
  
  alien=createSprite(50,height-300 ,20,100);
  alien.addAnimation("alien",alienImg);
  alien.scale=1.5;
  
  obstacleGroup = new Group();
  score = 0;
}

function draw() {
 background(0);
  
  fill("yellow");
  textSize(50);
  text("SCORE: "+ score, height-125,500);
  
  if(gameState===PLAY){
    if(path.x<250){
    path.x=380;
  }
  if(keyDown("space") && alien.y===height-378.5){
    alien.velocityY=-18;
  }
    if(keyDown("space") && alien.y===height-377.9){
    alien.velocityY=-18;
  }
    path.velocityX= -(10 + 5* score/100);
    
    score = score + Math.round(getFrameRate()/60);
    
  if(obstacleGroup.isTouching(alien)){
    gameState=END;
  }
  alien.velocityY=alien.velocityY+0.6;
  alien.collide(invground);
  
    gameover.visible=false;
  
  spawnObstacles();
  }
  else if(gameState==END){
    obstacleGroup.destroyEach();
    alien.destroy();
    path.destroy();
    alien.velocityX=0;
    path.velocityY=0;
    gameover.visible=true;
  }
  
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 150===0){
    obstacle=createSprite(1500,height-350,20,20);
    obstacle.velocityX=-(12 + score/100);
    obstacle.addImage(obstacleImg);
    obstacle.scale=1.5;
    obstacleGroup.add(obstacle);
  }
}