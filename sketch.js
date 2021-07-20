var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
 var survival = 0;
 var score = 0;
var forest, foresti;
var sound;


var poor;


function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  foresti = loadImage("FOR.jpg");
   sound = loadSound("sound.mp3");
  
 }

function setup() {
  createCanvas(500,500);
  background("white");
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,400,1000,10);
  ground.velocityX = -10;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
    
  forest = createSprite(250,250);
  forest.addImage("jungle",foresti);
  monkey.depth = forest.depth+1;
  
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  survival = 0;
   score = 0;

  
}


function draw() {
  background(500);
  
  stroke("red");
  text("SurvivalTime : " +survival ,150,50);
  

  stroke("yellow");
  text("SCORE :" +score ,300,50);
  
  
 // moving ground
    ground.velocityX = -3 

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
 
  
  survival =  survival + Math.round(getFrameRate()/60);
  console.log(survival);
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
   if (keyDown("space")){
    monkey.velocityY= -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
    console.log(score);
    sound.play();
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  
  
drawSprites();
}
  
function spawnFood(){
  if(frameCount % 90 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.lifeTime = 300;
    monkey.depth = banana.depth+1;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    obstacle = createSprite(800,370,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.16;
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle);
  }
}


   














