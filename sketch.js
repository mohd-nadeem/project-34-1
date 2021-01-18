//Create variables here
var dogImg, happyDog, dog;
var foodS, foodStock;
var database;

function preload() {
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(240, 220, 20, 20);
  dog.addImage(dogImg);
  

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    if(foodS > 0) {
      writeStock(foodS);
      dog.addImage(happyDog);
    }
  }

  dog.scale = 0.3

  if (keyWentUp(UP_ARROW)) {
    dog.addImage(dogImg);
  }


  drawSprites();

  //add styles here
  fill("white");
  textSize(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 20, 40)
  
}

function readStock(data) {
  foodS = data.val();

}
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}



