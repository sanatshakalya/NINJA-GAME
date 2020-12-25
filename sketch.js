//create fruits, sword, alien
var PLAY=1;
var END=0;
var gameState=1;
var sword,alien, fruits, fruitGroup,alienGroup;
var swordImage, alienImage, fruit1, fruit2, fruit3, fruit4;
var gameoverImage;                                                                                                                                                                                           

function preload(){
  //load the images of sword, fruits,alien,gameover
 swordImage= loadImage("sword.png");
  fruit1=loadImage("fruit1.png")
   fruit2=loadImage("fruit2.png")
   fruit3=loadImage("fruit3.png")
   fruit4=loadImage("fruit4.png")
  alien=loadAnimation("alien1.png","alien2.png")
  gameoverImage=loadImage("gameover.png")
  sound=loadSound("knifeSwooshSound.mp3")
  sound1=loadSound("gameover.mp3")
}
function setup (){
 //create background
  createCanvas(400,400)
  // create sword , sword Image and scale it.
  sword=createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale=0.5;
  //create fruitGroup and alienGroup
  fruitGroup=createGroup()
alienGroup=createGroup()
  //create score
  score=0
}

function draw(){
  //give background color
background("skyblue")
  
  if(gameState===PLAY){
    fruits()
    aliens()
    // move the sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    // give conditions to increase score when sword touches fruits
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach()
  
      score=score+2;
    }
    else
      // give conditions to END game when sword touches alien and reset
      if(alienGroup.isTouching(sword)){
        gameState=END
        fruitGroup.destroyEach()
        alienGroup.destroyEach()
        fruitGroup.setVelocityXEach(0)
        alienGroup.setVelocityXEach(0)
        sword.addImage(gameoverImage)
        sound.play();
        
        sword.x=200
        sword.y=200
      }
  }
  drawSprites()
  text("score:"+score,300,30)
  
}
function fruits(){
  //spawns the fruits from right
if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20)
  fruit.scale=0.2
 var r=Math.round(random(1,4))
  if(r==1){
    fruit.addImage(fruit1)
  }   
  else
    if(r==2){
    fruit.addImage(fruit2)
  }   
  else
    if(r==3){
    fruit.addImage(fruit3)
  }   
  else
    if(r==4){
    fruit.addImage(fruit4)
  }   
  fruit.y=Math.round(random(50,340))
  fruit.velocityX=-10
  fruit.setLifetime=100
  fruitGroup.add(fruit);
      
}
}
//spawn the fruits from left
if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20)
  fruit.scale=0.2
 var r=Math.round(random(1,4))
  if(r==1){
    fruit.addImage(fruit2)
  }   
  else
    if(r==2){
    fruit.addImage(fruit1)
  }   
  else
    if(r==3){
    fruit.addImage(fruit4)
  }   
  else
    if(r==4){
    fruit.addImage(fruit3)
  }   
  fruit.y=Math.round(random(340,50))
  fruit.velocityX=10
  fruit.setLifetime=100
  fruitGroup.add(fruit);
      
}

function aliens (){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20)
    alien.addAnimation("alien1.png","alien2.png")
    alien.scale=0.5
    alien.y=Math.round(random(100,300))
    alien.velocityX=-8
    alien.setLifetime=50
    alienGroup.add(alien)
  }
}