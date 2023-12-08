



let cheese;
let ratio;

let cheesewheel;
let stringcheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke()
  ratio = smallest();
  // cheesewheel = new Sprite(width/2,height/2,cheese.body.y);
  cheese = new TowT(width/2,height/2);
  
  // cheesewheel.r = 20;
  // // strokeWeight(1);
  // stringcheese = new DistanceJoint(cheese.body, cheesewheel);
  // stringcheese.springiness = 1;
  // stringcheese.offsetA.x = -1*cheese.body.w/2;
}


function draw() {
  // clear();
  
  cheese.vehicle.drive();
  // cheese.display();


}


class TowT{
  constructor(x,y){
    this.facelength = 12;
    this.facewidth = 20;
    this.bodylength = 20;
    this.bodywidth = 16;
    this.vehicle = new Car(x,y,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9, 4, 0.7);
    this.arm = new Sprite(x-this.bodylength-this.facelength*4/9,y);
    this.arm.w = this.facelength*2/3;
    this.arm.h = 1;
    this.armbase = new GlueJoint(this.arm,this.vehicle.body);
    this.object = new Sprite(x-this.bodylength-this.arm.w*2,y);
    this.object.radius = this.facelength/3;
    this.object.drag = 1;
    this.towline = new DistanceJoint(this.arm,this.object);
    this.towline.offsetA.x = -1*this.arm.w/2;
    this.towline.springiness = 0.5;
  }
}
class Sport{
  constructor(x,y){
    this.facelength = 14;
    this.facewidth = 19;
    this.bodylength = 16;
    this.bodywidth = 20;
    this.bumper = new Sprite(x+this.facelength,y);
    this.bumper.d = this.facewidth;
    this.vehicle = new Car(x,y,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 12, 5, 2.5);
    this.front = new GlueJoint(this.bumper,this.vehicle.face);
  }
}

class Car{
  constructor(x,y,facelength,facewidth,backlength,backwidth, acceleration, braking, handling){
    this.body = new Sprite(x-backlength/2,y);
    this.body.w = backlength;
    this.body.h = backwidth;
    this.body.drag = 1;
    this.body.rotationDrag = 2;
    this.face = new Sprite(x+facelength/2,y);
    this.face.w = facelength;
    this.face.h = facewidth;
    this.face.drag = 2.5;
    this.face.rotationDrag = 2;
    this.midsec = new GlueJoint(this.body,this.face);
    this.move = 0;
    this.turn = 0;
    this.acceleration = acceleration;
    this.braking = braking;
    this.handling = handling;
    
  }

  drive() {
    // cheese.move = 0;
  // cheese.turn = 0;
  // cheese.bare = cheese.rotation-360;
  // map(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y),0,20,0,3)
    if (Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 0.5){
      if((!keyIsDown(16)||(Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 1.5))){

        if (keyIsDown(65)){
          this.turn -= this.handling;
        // cheese.bearing = cheese.bare-90;
        // cheese.applyForce(1);
        }
        if (keyIsDown(68)){
          this.turn += this.handling;
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
      this.move += this.acceleration/10;
    }
    // brake
    if (keyIsDown(32)){
      this.move -= toZero(this.move)*this.braking-3;
      this.move -= this.braking;

    }
    // handbrake
    if (keyIsDown(16)){
      for (let i = 0; i < 20; i++){
        this.move -= toZero(this.move);
      }
      this.body.speed -= toZero(this.body.speed)*10**-1;
      console.log("handbrake");
    }

    this.body.bearing = this.body.rotation-360;
  
    this.body.applyForce(this.move);
    if (keyIsDown(87)||keyIsDown(32)){
      // this.move =0;
    }
    // else {
    
    // }
    // if (this.move > 0){
    this.move -= toZero(this.move)*10**-1;
    // }
    // console.log(this.move);
    if(this.move > 10){
      this.move = 10;
    }
    this.turn -= toZero(this.turn)*this.handling;
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