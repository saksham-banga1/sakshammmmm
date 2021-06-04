var dogImg, happyDogImg, dog, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(230,180);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW) && foodS > 0){
    writeStock(foodS);
    dog.addImage(happyDogImg);
    foodS--;
  }

  drawSprites();
  textSize(40);
  fill("black");
  stroke("gray");
  text(foodS,200,420);

}

//Function to read values from DB
function readStock(data){
  foodS = data.val();
}

//Function to write values in DB
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}