



let cheese;
let ratio;

let cheesewheel;
let stringcheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ratio = smallest();
  cheesewheel = new Sprite(100,0);
  cheesewheel.r = 20;
  cheese = new Car();
  stringcheese = new DistanceJoint(cheese.body, cheesewheel);
}


function draw() {
  // clear();
  
  cheese.drive();
  // cheese.display();

  // drive(mozarella);
}

let turn = 0;
let move = 0;
function drive(car){
  if (Math.abs(car.vel.x)+Math.abs(car.vel.y) > 0){
    if((!keyIsDown(16)||(Math.abs(car.vel.x)+Math.abs(car.vel.y) > 1.5))){
      if (keyIsDown(65)){
        turn -= 1;
      // cheese.bearing = cheese.bare-90;
      // cheese.applyForce(1);
      }
      if (keyIsDown(68)){
        turn += 1;
      // cheese.bearing = cheese.bare+90;
      // cheese.applyForce(1);
      }
    // cheese.turn += toZero(cheese.turn)*;
    }
  // else {
  //   console.log("handbrake stopped turning");
  // }
  }
  car.rotationSpeed = turn;

  // cheese.bearing = cheese.rotation-360;
  // gas
  if (keyIsDown(87)){
    move += 10;
  }
  // brake
  if (keyIsDown(32)){
    move -= toZero(move)*2;
    move -= 5;

  }
  // handbrake
  if (keyIsDown(16)){
    console.log("handbrake!!");
    for (let i = 0; i < 1; i++){
      car.speed -= toZero(car.speed)*10**-1;
    }
  }

  car.bearing = car.rotation-360;

  car.applyForce(move);
  if (keyIsDown(87)||keyIsDown(32)){
    move =0;
  }
  else {
  // cheese.move -= toZero(cheese.move)*10**-6;
  }

  turn -= toZero(turn)*10**0;
// if (keyIsDown(16)){
//   cheese.turn -= toZero(cheese.turn)*10**3;
// }
}


class Car{
  constructor(){
    this.body = new Sprite();
    this.body.w = 40;
    this.body.h = 20;
    this.body.drag = 2;
    this.body.rotationDrag =2;
    // this.body.rotationSpeed = 0;
    // this.body.vel = {x:0, y:0};
    this.move = 0;
    this.turn = 0;
    // this.coloour = "red";
  }

  drive() {
    // cheese.move = 0;
  // cheese.turn = 0;
  // cheese.bare = cheese.rotation-360;
  // map(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y),0,20,0,3)
    if (Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 0){
      if((!keyIsDown(16)||(Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 1.5))){
        if (keyIsDown(65)){
          this.turn -= 1;
        // cheese.bearing = cheese.bare-90;
        // cheese.applyForce(1);
        }
        if (keyIsDown(68)){
          this.turn += 1;
        // cheese.bearing = cheese.bare+90;
        // cheese.applyForce(1);
        }
      // cheese.turn += toZero(cheese.turn)*;
      }
    // else {
    //   console.log("handbrake stopped turning");
    // }
    }
    this.body.rotationSpeed = this.turn;


    // gas
    if (keyIsDown(87)){
      this.move += 10;
    }
    // brake
    if (keyIsDown(32)){
      this.move -= toZero(this.move)*2;
      this.move -= 5;

    }
    // handbrake
    if (keyIsDown(16)){
      for (let i = 0; i < 20; i++){
        this.move -= toZero(this.move);
      }
    }

    this.body.bearing = this.body.rotation-360;
  
    this.body.applyForce(this.move);
    if (keyIsDown(87)||keyIsDown(32)){
      this.move =0;
    }
    else {
    // cheese.move -= toZero(cheese.move)*10**-6;
    }

    this.turn -= toZero(this.turn)*10**0;
  // if (keyIsDown(16)){
  //   cheese.turn -= toZero(cheese.turn)*10**3;
  // }
  }

  // display(){
  //   fill(this.coolour);
  //   noStroke();
    
  //   push();
  //   translate(this.body.x*ratio,this.body.y*ratio);
  //   rotate(this.angle);
  //   rectMode(CENTER);
  //   rect(0,0,this.length*ratio,this.width*ratio);
  //   pop();
  //   // fill("black");
  //   // circle(this.body.x*ratio+this.carface.x*3.5, this.body.y*ratio+this.carface.y*3.5, this.length/this.width*5);
  // }
}

function toZero(number){
  if (number !== 0){
    return number/Math.abs(number);
  }
  return number;
  
}
function smallest(){
  let smoll;
  if (windowHeight/20 < windowWidth/35){
    smoll = windowHeight/20;
  } 
  else{
    smoll = windowWidth/35;
  }
  return smoll;
}