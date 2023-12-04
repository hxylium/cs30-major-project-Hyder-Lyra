



let cheese;
let ratio;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ratio = smallest();
  cheese = new Car();
  // cheese.w = 40;
  // cheese.h = 50;
  // cheese.rotation = 0;
  // world.gravity.y = 2;
}


function draw() {
  // clear();
  
  cheese.drive();
  cheese.display();
}



class Car{
  contructor(){
    this.body = new Sprite();
    console.log(this.body);
    this.body.w = 20;
    this.body.h = 40;
    this.body.drag = 2;
    this.body.rotationDrag =2;
    // this.body.rotationSpeed = 0;
    // this.body.vel = {x:0, y:0};
    this.move = 0;
    this.turn = 0;
    this.colour = "red";
  }

  drive() {
    // cheese.move = 0;
  // cheese.turn = 0;
  // cheese.bare = cheese.rotation-360;
  // map(Math.abs(cheese.vel.x)+Math.abs(cheese.vel.y),0,20,0,3)
  console.log(this.body);
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

    // cheese.bearing = cheese.rotation-360;
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

    this.bearing = this.rotation-360;
  
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

  display(){
    fill(this.colour);
    noStroke();
    
    push();
    translate(this.body.x*ratio,this.body.y*ratio);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0,0,this.length*ratio,this.width*ratio);
    pop();
    // fill("black");
    // circle(this.body.x*ratio+this.carface.x*3.5, this.body.y*ratio+this.carface.y*3.5, this.length/this.width*5);
  }
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