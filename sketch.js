



let cheese;
let ratio;

let cheesewheel;
let stringcheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke()
  ratio = smallest();
  // cheesewheel = new Sprite(width/2,height/2,cheese.body.y);
  cheese = new TowT(width/2,height/2, 12, 20, 20, 16);
  
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
  constructor(x,y,facelength,facewidth,bodylength,bodywidth){
    this.vehicle = new Car(x,y,facelength,facewidth,bodylength,bodywidth);
    this.arm = new Sprite(x-bodylength-facelength*4/9,y);
    this.arm.w = facelength*2/3;
    this.arm.h = 1;
    this.armbase = new GlueJoint(this.arm,this.vehicle.body);
    this.object = new Sprite(x-bodylength-this.arm.w*2,y);
    this.object.radius = facelength/3;
    this.object.drag = 1;
    this.towline = new DistanceJoint(this.arm,this.object);
    this.towline.offsetA.x = -1*this.arm.w/2;
    this.towline.springiness = 0.5;
  }
}

class Car{
  constructor(x,y,facelength,facewidth,backlength,backwidth){
    this.body = new Sprite(x-backlength/2,y);
    this.body.w = backlength;
    this.body.h = backwidth;
    // this.body.drag = 1;
    // this.body.rotationDrag =1;
    this.face = new Sprite(x+facelength/2,y);
    this.face.w = facelength;
    this.face.h = facewidth;
    this.face.drag = 2;
    this.face.rotationDrag =2;
    this.midsec = new GlueJoint(this.body,this.face);
    this.move = 0;
    this.turn = 0;
    
  }

  drive() {
    // cheese.move = 0;
  // cheese.turn = 0;
  // cheese.bare = cheese.rotation-360;
  // map(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y),0,20,0,3)
    if (Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 0.5){
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

    this.turn -= toZero(this.turn);
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