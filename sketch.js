



let cheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cheese = new Sprite();
  cheese.width = 40;
  cheese.height = 50;
  world.gravity.y = -5;
}


function draw() {
  // clear();
  if (kb.pressing('down')){
    cheese.move(30,"down", 3);
  }
  
 
}
