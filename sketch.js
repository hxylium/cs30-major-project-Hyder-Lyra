



let cheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cheese = new Sprite();
  cheese.h = 40;
  cheese.w = 80;
  // cheese.rotation = 0;
  cheese.offset.x = cheese.w - (cheese.h+cheese.h/4);
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
  
  // cheese.move = 0;
  // cheese.turn = 0;
  cheese.bare = cheese.rotation-360;
  // map(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y),0,20,0,3)
  if (Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y) > 0){
    if((!keyIsDown(16)||(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y) > 1.5))){
      if (keyIsDown(65)){
        cheese.turn -= 1;
        cheese.bearing = cheese.bare-90;
      // cheese.applyForce(1);
      }
      if (keyIsDown(68)){
        cheese.turn += 1;
        cheese.bearing = cheese.bare+90;
        // cheese.applyForce(1);
      }
    }
    else {
      console.log("handbrake stopped turning");
    }
  }
  cheese.rotationSpeed = cheese.turn;

  cheese.bearing = cheese.rotation-360;
  // gas
  if (keyIsDown(87)){
    cheese.move += 20;
  }
  // brake
  if (keyIsDown(32)){
    cheese.move -= 5;
  }
  // handbrake
  if (keyIsDown(16)){
    for (let i = 0; i < 20; i++){
      cheese.move -= toZero(cheese.move);
    }
  }
  
  cheese.applyForce(cheese.move);
  if (keyIsDown(87)||kb.pressing('space')){
    cheese.move =0;
  }
  else {
    cheese.move -= toZero(cheese.move)*10**-5;
  }

  cheese.turn -= toZero(cheese.turn)*10**0;
  // if (keyIsDown(16)){
  //   cheese.turn -= toZero(cheese.turn)*10**3;
  // }
}

function toZero(number){
  if (number !== 0){
    return number/Math.abs(number);
  }
  return number;
  
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
