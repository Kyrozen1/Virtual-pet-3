//Create variables here
var dog;
var database, foodS, foodStock;
var dogImg, happydogImg;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var readState, gameState;
var bedroom,bedroomImg,washroom,washroomImg,garden,gardenImg;
var currentTime;

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png")
  happydogImg = loadImage("images/Happy.png")
  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg = loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(600,1000);
  
  database = firebase.database();

  dog = createSprite(300, 780, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock)

  feed = createButton("Feed the dog");
  feed.position(650, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750, 95);
  addFood.mousePressed(addFoods)

  foodObj = new Food()
  foodObj.deductFood()

  readState = database.ref("GameState");
  readState.on("value",function(data){
    gameState = data.val();
  });
}


function draw() {  
  background(46,139,87)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:" + lastFed%12 + "PM", 100,60);
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,95);
  }else{
    text("Last Feed:" + lastFed + "AM", 100,60);
  }

  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog = createSprite(300, 780, 10, 10);
    dog.addImage(dogImg);
    dog.scale = 0.3;
  }

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }
  
  drawSprites();
}

function feedDog(){
  dog.addImage(happydogImg);
  dog.scale = 0.3;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function update(state){
  database.ref('/').update({
    GameState:state
  });
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}