



let cheese;
let dummy;
let ratio;
let everything = [];
let objects = [];

let divider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke()
  ratio = smallest();
  ratio = ratio/20;
  
  cheese = new Delor(width*2/3,height*2/3);
  objects.push(cheese);
  // dummy = new Delor(width/3, height/3);
  divider = new Wall(width/2,height/2,70,10);
  objects.push(divider);
  
  
}


function draw() {
  // clear();
  
  cheese.vehicle.drive();
  cheese.display(true);
  divider.display();
  // for (let item of objects){
  //   if (item === cheese){
  //     item.display()
  //   }
  // }
}


// TowT related things
let growthrate = 0.5;
let maxsize = 20;
let balls = {
  list: [],
  count: 0,
};


class TowT{
  constructor(x,y){
    this.facelength = 12;
    this.facewidth = 20;
    this.bodylength = 20;
    this.bodywidth = 16;
    this.vehicle = new Car(x,y,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 8.5, 11.5, 2, 1.7, this.grow, this.shrink);
    this.arm = new Sprite(x-this.bodylength-this.facelength*4/9,y);
    this.arm.w = this.facelength*2/3;
    this.arm.h = 1;
    everything.push(this.arm);
    this.armbase = new GlueJoint(this.arm,this.vehicle.body);
    this.object = new Sprite(x-this.bodylength-this.arm.w*2,y);
    this.object.radius = this.facelength/3;
    this.object.drag = 1;
    this.object.bounciness = 2;
    this.object.smallest = this.facelength/3;
    balls.list.push(this.object);
    this.vehicle.id = balls.count;
    balls.count +=1;
    this.towline = new DistanceJoint(this.arm,this.object);
    this.towline.offsetA.x = -1*this.arm.w/2;
    this.towline.springiness = 0.6;
  }
  grow(){
    if (balls.list[this.id].radius < maxsize){
      // console.log("grow");
      balls.list[this.id].radius += growthrate;
    }
    
  }
  shrink(){
    if (balls.list[this.id].radius > balls.list[this.id].smallest){
      // console.log("shrink");
      balls.list[this.id].radius -= growthrate/2;
    }
  }

  display(playerTrue){
    // todo
    this.vehicle.display(playerTrue);
  }
}
class Sport{
  constructor(x,y){
    this.facelength = 15;
    this.facewidth = 19;
    this.bodylength = 16;
    this.bodywidth = 20;
    this.bumper = new Sprite(x+this.facelength,y);
    this.bumper.d = this.facewidth;
    this.bumper.drag = 2.5;
    this.bumper.bounciness = 0.8
    everything.push(this.bumper);
    this.vehicle = new Car(x,y,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 10, 12, 3, 2.5, this.handbrake, this.unhandbrake);
    this.front = new GlueJoint(this.bumper,this.vehicle.face);
    this.vehicle.handbrake = false;
  }
  handbrake(){
    // handbrake
    for (let i = 0; i < 20; i++){
      this.move -= toZero(this.move);
    }
    this.body.speed -= toZero(this.body.speed)*10**-1;
    console.log("handbrake");
  }
  unhandbrake(){
    if(this.hanbrake === true){
      this.handbrake = false;
    }
  }
  display(playerTrue){
    // todo
    this.vehicle.display(playerTrue);
  }
}
class Delor{
  constructor(x,y){
    this.facelength = 15;
    this.facewidth = 19;
    this.bodylength = 23;
    this.bodywidth = 20;
    // this.bumper = new Sprite(x+this.facelength,y);
    // this.bumper.d = this.facewidth;
    this.vehicle = new Car(x,y,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11.5, 4.5, 2.3, this.blink, this.cooldown);
    this.vehicle.phased = false;
    this.vehicle.timer = 0;
    // this.front = new GlueJoint(this.bumper,this.vehicle.face);
  }

  blink(){
    if (!this.phased){
      if(this.timer <=0){
        this.phased = true;
        this.timer = 0;
        for (let item of everything){
          this.body.overlaps(item);
          this.face.overlaps(item);
        }
        console.log("blinked");
      }
    }
  }
  cooldown(){
    if(this.phased){
      this.timer ++;
      if (this.timer >= 300){
        this.phased = false;
        for (let item of everything){
          this.body.collides(item);
          this.face.collides(item);
        }
        console.log("unblinked");
      }
    }
    else{
      this.timer --;
      if (this.timer <=0){
        console.log("recharged");
      }
    }
  }

  display(playerTrue){
    this.vehicle.display(playerTrue);
  }
}

class Car{
  constructor(x,y,facelength,facewidth,backlength,backwidth, acceleration, maxspeed, braking, handling, thing, thing2){
    this.body = new Sprite(x-backlength/2,y);
    this.body.w = backlength;
    this.body.h = backwidth;
    this.body.drag = 2;
    this.body.rotationDrag = 3;
    this.body.bounciness = 0.8;
    everything.push(this.body);
    this.face = new Sprite(x+facelength/2,y);
    this.face.w = facelength;
    this.face.h = facewidth;
    this.face.drag = 2.5;
    this.face.rotationDrag = 2;
    this.face.bounciness = 0.8;
    everything.push(this.face);
    this.midsec = new GlueJoint(this.body,this.face);
    this.move = 0;
    this.turn = 0;
    this.acceleration = acceleration;
    this.maxspeed = maxspeed;
    this.braking = braking;
    this.handling = handling;
    this.thing = thing;
    this.thing2 = thing2;
  }

  special(){
    this.thing();
  }
  specialCleanup(){
    this.thing2();
  }

  carCenter(){
    return {x:(this.body.x+this.face.x)/2, y: (this.body.y+this.face.y)/2};
  }

  drive() {
    if (Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 0){
      if((this.hanbrake === false||(Math.abs(this.body.vel.x)+Math.abs(this.body.vel.y) > 1.5))){

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
    
    // this.body.rotationSpeed += this.turn/6;
    this.body.applyTorque(this.turn/10);
    //special cleanup
    if (this.thing2 !== null){
      this.specialCleanup();
    }

    // gas
    if (keyIsDown(87)){
      this.move += this.acceleration/60;
    }
    // brake
    if (keyIsDown(32)){
      if (toZero(this.move) === 1){
        this.move -= toZero(this.move)*this.braking/5;
      }
      this.move -= this.acceleration/(60);

    }
    // special ability
    if (keyIsDown(16)){
      this.special();
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
    if(this.move > this.maxspeed){
      console.log("hitmax");
      this.move = this.maxspeed;
    }
    if (this.move < -1*this.maxspeed/2){
      this.move = -1*this.maxspeed/2;
    }
    // this.turn -= toZero(this.turn)*this.handling;
    this.turn = 0;
  }

  display(playerTrue){
    // fill(this.coolour);
    // noStroke();
    let babybell = cheese.vehicle.carCenter();
    if (playerTrue){
      push();
      translate(width/2,height/2);
      rotate(this.body.rotation);
      rectMode(CENTER);
      rect((babybell.x -this.body.x)*ratio, (babybell.y -this.body.y)*ratio,this.body.w*ratio,this.body.h*ratio);
      // rect(0+this.body.w/2,0,this.body.w*ratio,this.body.h*ratio);
      pop();
      push();
      translate(width/2,height/2);
      rotate(this.face.rotation);
      rectMode(CENTER);
      rect((babybell.x -this.face.x)*ratio, (babybell.y -this.face.y)*ratio,this.face.w*ratio,this.face.h*ratio);
      // rect(0+this.face.w/2,0,this.face.w*ratio,this.face.h*ratio);
      pop();
    }
    else {
      push();
      translate((babybell.x + this.body.x)*ratio, (babybell.y + this.body.y)*ratio);
      rotate(cheese.vehicle.face.rotation + this.body.rotation);
      rectMode(CENTER);
      rect(0,0,this.body.w*ratio,this.body.h*ratio);
      pop();
      push();
      translate((babybell.x + this.face.x)*ratio, (babybell.y + this.face.y)*ratio);
      rotate(cheese.vehicle.face.rotation + this.face.rotation);
      rectMode(CENTER);
      rect(0,0,this.face.w*ratio,this.face.h*ratio);
      pop();
    }
    
  }
}


class Wall{
  constructor(x,y,width,height){
    this.cement = new Sprite(x,y,width,height);
    this.cement.collider = "static";
    everything.push(this.cement);
  }

  display(){
    rectMode(CENTER);
    let babybell = cheese.vehicle.carCenter();
    push();
    translate((babybell.x + this.cement.x)*ratio, (babybell.y + this.cement.y)*ratio);
    rotate( this.cement.rotation); //cheese.vehicle.face.rotation +
    rect(0,0,this.cement.width*ratio,this.cement.height*ratio);
    pop();
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
  let wide = 40;
  let tall = 70;
  if (windowHeight/wide < windowWidth/tall){
    smoll = windowHeight/wide;
  } 
  else{
    smoll = windowWidth/tall;
  }
  return smoll;
}