



let cheese;
let ratio;

let cheesewheel;
let stringcheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
  ratio = smallest();
  cheese = new Car(width/2,height/2, 19,16,23,19);
  // cheesewheel = new Sprite(cheese.body.x-cheese.body.w-10,cheese.body.y);
  // cheesewheel.r = 20;
  // stringcheese = new DistanceJoint(cheese.body, cheesewheel);
  // stringcheese.springiness = 1;
  // stringcheese.offsetA.x = -20;
}


function draw() {
  // clear();
  
  cheese.drive();
  // cheese.display();

  // drive(mozarella);
}

class Car{
  constructor(x,y,facelength,facewidth,backlength,backwidth){
    this.body = new Sprite(x-backlength/2,y);
    this.body.w = backlength;
    this.body.h = backwidth;
    this.body.drag = 2;
    this.body.rotationDrag =2;
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