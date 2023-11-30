



let cheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cheese = new Sprite();
  cheese.h = 40;
  cheese.w = 80;
  // cheese.rotation = 0;
  cheese.offset.x = 30;
  cheese.move = 0;
  cheese.turn = 0;
  cheese.drag = 1;
  cheese.rotationDrag = 2;
  cheese.rotationSpeed = 0;
  // cheese.w = 40;
  // cheese.h = 50;
  // cheese.rotation = 0;
  // world.gravity.y = 2;
}


function draw() {
  clear();
  
  
  cheese.turn -= toZero(cheese.turn);
  // cheese.move = 0;
  cheese.turn = 0;
  // map(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y),0,20,0,3)
  if (Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y) > 0){
    if (kb.pressing('left')){
      cheese.turn -= 1;
    }
    if (kb.pressing('right')){
      cheese.turn += 1;
    }
  }
  cheese.rotationSpeed = cheese.turn;


  cheese.bearing = cheese.rotation-360;

  if (keyIsDown(87)){
    cheese.move += 20;
  }
  if (kb.pressing('space')){
    cheese.move -= 10;
  }
  
  cheese.applyForce(cheese.move);
  if (keyIsDown(87)||kb.pressing('space')){
    cheese.move =0;
  }
  else {
    cheese.move -= toZero(cheese.move);
  }
}

function toZero(number){
  return number/Math.abs(number);
}

class Car{
  contructor(){
    this.body = new Sprite();
    this.body.w = 40;
    this.body.h = 50;
    
  }

  // move(){
  //   if (kb.pressing('up')){
  //     this.body.vel.y += 5*Math.sin(this.body.rotation);
  //     this.body.vel.x += 5*Math.cos(this.body.rotation);
  //   }
  //   if (kb.pressing('space')){
  //     this.body.vel.y -= 2.5*Math.sin(this.body.rotation);
  //     this.body.vel.x -= 2.5*Math.cos(this.body.rotation);
  //   }
  // }
}
