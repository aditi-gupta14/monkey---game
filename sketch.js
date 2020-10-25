PLAY = 1;
END = 0;
gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survival;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(400,400);

  monkey=createSprite(100,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(0,390,800,18);
  ground.velocityX=-5;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {

  background(255);
  
  stroke("black");
  fill("black");
  textSize(25);
  text("Survival Time:"+ survival ,200,20);
  
  if(ground.x<0){
    
      ground.x=ground.width/2;
    
  }
  
  if(gameState === PLAY);{
    
    monkey.velocityY=monkey.velocityY+0.8;       
    
    survival=Math.ceil(frameCount/frameRate());
    
  }
    
    if(keyDown("space") && monkey.y>=120){
      
      monkey.velocityY=-12;
    
    }
  
    monkey.collide(ground);
    
    if(monkey.isTouching(foodGroup)){
      
        foodGroup.destroyEach();
      
    }   
  
    if(monkey.isTouching(obstaclesGroup)){
      
      gameState = END;
      
    }
    
    bananas();
    problems();

if(gameState === END){
  
     monkey.x=500;
     obstaclesGroup.destroyEach();
     foodGroup.destroyEach();
     survival = 0;
    
  } 
  
   drawSprites();

}

function bananas(){
  
  if(frameCount%80===0){
    
    banana=Math.round(random(120,200));
    banana=createSprite(400,banana,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=150;
    
    foodGroup.add(banana);
    
  }
}

function problems(){
  
  if(frameCount%300===0){
    
    obstacle=createSprite(400,370,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.2;
    obstacle.lifetime=150;
    obstaclesGroup.add(obstacle);
    
  }
}