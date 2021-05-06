var bananaImage;
var player_running,player;
var backImage;
var obstaclesGroup, obstacleImage;

var score;


function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backImage = loadImage("jungle.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(800, 400);
  
  bgImage = createSprite(0,0,800,400);
  bgImage.addImage(backImage);
  bgImage.x = backImage.width /2;
  bgImage.velocityX = - (6 + 3*score/100);
  bgImage. scale=2.955;

  player = createSprite(100,340,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  
  ground=createSprite(400,350,800,10)
  //invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false;
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(180);

   //score = score + Math.round(getFrameRate()/60);
   
  if(ground.x<0){
     ground.x = ground.width/2
     }
  
  if (bgImage.x < 100){
    bgImage.x = bgImage.width/2;
  }
  
  
  if(bananaGroup.isTouching(player)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  
  switch(score){
    case 10:player.scale=0.12
      break;
    case 20:player.scale=0.14
      break;
    case 30:player.scale=0.16
      break;
    case 40:player.scale=0.18
      break;
      default:break;
  }
  
  if (keyDown("space")){
    player.velocityY=-12;
  }
  
  player.velocityY=player.velocityY+0.8;
  player.collide(ground);
  
  spawnObstacles();
  spawnFood();
  
    if (obstaclesGroup.isTouching(player)) {
      player.scale=0.08;
    }
 
  drawSprites(); 
  
  textSize(20)
  fill("red")
  text("Score: "+ score, 500,50);
  
}



function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.2;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle)

}
}

function spawnFood(){
  if(frameCount%80==0){
    var banana=createSprite(600, 250, 40, 10)
    banana.y=random(120,200)
    banana.addImage(bananaImage)
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=300;
    player.depth=banana.depth+1;
    bananaGroup.add(banana)
     }
}