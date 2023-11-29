



let cheese;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cheese = new Sprite();
  cheese.rotation = 20
  cheese.accel = 2;
  // cheese.w = 40;
  // cheese.h = 50;
  // cheese.rotation = 0;
  // world.gravity.y = -5;
}


function draw() {
  clear();
  cheese.rotateTowards(mouse, 0.1,0);
  if (kb.pressing('up')){
    console.log(cheese.vel.y += cheese.accel*Math.sin(cheese.rotation));
    cheese.vel.x += cheese.accel*Math.cos(cheese.rotation);
  }
  if (kb.pressing('space')){
    cheese.vel.y -= cheese.accel/2*Math.sin(cheese.rotation);
    cheese.vel.x -= cheese.accel/2*Math.cos(cheese.rotation);
  }
  
  if (cheese.vel.y !== 0){
    cheese.vel.y -= Math.abs(cheese.vel.y)/cheese.vel.y*cheese.accel/4;
  }
  if (cheese.vel.x !== 0){
    cheese.vel.x -= Math.abs(cheese.vel.x)/cheese.vel.x*cheese.accel/4;
  }
  if (cheese.vel.x + cheese.vel.y >= 5){
    let dif = (cheese.vel.x + cheese.vel.y)-6;
    let percent = dif/(cheese.vel.x + cheese.vel.y)
    cheese.vel.y = cheese.vel.y/percent;
    cheese.vel.x = cheese.vel.x/percent;
  }
  console.log(cheese.x, cheese.y);
  // cheese.vel.y*7/8
  
}

class Car{
  contructor(){
    this.body = new Sprite();
    this.body.w = 40;
    this.body.h = 50;
    this.body.rotation = 0;
    this.carface = {x:0, y:0};
    this.spd = 5;
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
