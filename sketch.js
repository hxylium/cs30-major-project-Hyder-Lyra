



let cheese;
let dummy;
let ratio;
let everything = [];
let spikes = [];
let laps = 3;

let finsished = [];


let divider1,divider2,divider3,divider4,eastwall1,westwall1,eastwall2,westwall2,eastwall3;

let south1, south2, south3, south4, south5, south6;

let dwall1,dwall2;

let cap;
let death;
let respawntime = 150;


let checkpoints = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  // noStroke()
  ratio = smallest();
  ratio = ratio/20;
  
  cheese = makeVehicle(1000,870,1,0,Rocket);
  // dummy = new Delor(width/3, height/3);
  dwall2 = new SpWall(805,500,14);
  divider1 = new Wall(570,500,900,15,0);
  

  dwall1 = new SpWall(185,95,59); 
  divider2 = new Wall(580,90,800,25,0,true);
  

  divider3 = new Wall(600,260,750,15,0);
  

  eastwall1 = new Bend(150,224,12,11,0, -1,true);
  eastwall2 = new Bend(150,225,12,11, -11, -1);

  westwall1 = new Bend(780,328,20,10.5, 0, 1,true);
  westwall2 = new Bend(780,328,20,10, 17, 1);

  eastwall3 = new Bend(720,369,14,10,1,1);

  
  south1 = new Bend(980,760,23,7,-9,-1);

  south3 = new Bend(735, 335, 12.4, 9, 22,1);

  south2 = new Bend(670, 640, 14, 11, 20, 1);

  south4 = new Bend(675, 700, 10, 9, -20, -1);

  south5 = new Bend(1008,720,12,8,-7,-1);
  
  
  divider4 = new Wall(760, 820, 15, 300,0);

  south6 = new Bend(703,515,12,10,-15, 1, true);

  // finish/start 
  makecheckP(700,380, 0, checkpoints, 215);

  makecheckP(110,270, 180, checkpoints,100);
  makecheckP(850, 180, -90, checkpoints, 65);
  makecheckP(990, 981, 0, checkpoints, 150);
  
  
}


function draw() {
  clear();
  
  cheese.docar();

  camera.pos = cheese.vehicle.face.pos;
}


// TowT related things

let balls = {
  list: [],
  count: 0,
};


function respawn(checkNum,self,lap,type){
  self.vehicle.body.remove();
  self.vehicle.face.remove();
  self.vehicle.respawnBar.remove();
  self.vehicle.lapCounter.remove();
  self.vehicle.abilityBar.remove();
  let point = checkpoints[checkNum];
  return makeVehicle(point.x,point.y,lap,point.spot.rotation, type);

}

function makeVehicle(x,y,lap,rotation,type){
  let beep = new type(x,y,lap,rotation);
  beep.vehicle.dead = false;
  beep.self = beep;
  return beep;
}
class TowT{
  constructor(x,y,rotation){
    this.type = TowT;
    this.facelength = 12;
    this.facewidth = 20;
    this.bodylength = 20;
    this.bodywidth = 16;
    this.vehicle = new Car(x,y,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 8.5, 11.5, 2, 1.7, this.handbrake, this.unhandbrake,"Handbrake","HANDBRAKE!!");
    this.arm = new Sprite(x*big+this.bodylength+this.facelength*4/9,y*big);
    this.vehicle.face.drag = 1.2;
    this.arm.w = this.facelength/3;
    this.arm.h = 1;
    this.arm.darg = 2;
    everything.push(this.arm);
    this.armbase = new GlueJoint(this.arm,this.vehicle.body);
    this.object = new Sprite(x*big+this.bodylength+this.arm.w*2,y*big);
    this.object.radius = this.facelength/4;
    this.object.drag = 1.5;
    this.object.bounciness = 1;
    // this.object.smallest = this.facelength/7;
    // this.object.overlaps(this.vehicle.body);
    // this.object.overlaps(this.vehicle.face);
    balls.list.push(this.object);
    everything.push(this.object);
    this.vehicle.id = balls.count;
    balls.count +=1;
    this.towline = new DistanceJoint(this.arm,this.object);
    this.towline.offsetA.x = 1*this.arm.w/2;
    this.towline.springiness = 0.6;

    this.vehicle.timer = 300;
    this.vehicle.time = 20;
    this.abilityBar.barmin =20;
  }
  handbrake(){
    // handbrake
    for (let i = 0; i < 20; i++){
      this.move -= toZero(this.move);
    }
    this.body.speed -= toZero(this.body.speed)*10**-1;
    this.timer = this.time;
    // console.log("handbrake");
  }
  unhandbrake(){
    if(this.hanbrake === true){
      this.handbrake = false;
    }
  }
  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn();
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
  }
  
}
class Sport{
  constructor(x,y,rotation){
    this.type = Sport;
    this.facelength = 15;
    this.facewidth = 19;
    this.bodylength = 16;
    this.bodywidth = 20;
    this.bumper = new Sprite(x*big-this.facelength,y*big);
    this.bumper.d = this.facewidth;
    this.bumper.drag = 2.5;
    this.bumper.bounciness = 0.8;
    everything.push(this.bumper);
    this.vehicle = new Car(x,y,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 10, 16, 3, 2.5, this.handbrake, this.unhandbrake, "Handbrake","HANDBRAKE!!");
    this.front = new GlueJoint(this.bumper,this.vehicle.face);

    this.vehicle.handbrake = false;
    this.vehicle.timer = 300;
    this.vehicle.time = 20;
    // this.abilityBar.barmin =20;
  }
  handbrake(){
    // handbrake
    for (let i = 0; i < 20; i++){
      this.move -= toZero(this.move);
    }
    this.body.speed -= toZero(this.body.speed)*10**-1;
    this.timer = this.time;
    // console.log("handbrake");
  }
  unhandbrake(){
    if(this.hanbrake === true){
      this.handbrake = false;
    }
  }
  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn();
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
  }
}
class Delor{
  constructor(x,y,rotation){
    this.type = Delor;
    this.facelength = 15;
    this.facewidth = 19;
    this.bodylength = 23;
    this.bodywidth = 20;
    // this.bumper = new Sprite(x+this.facelength,y);
    // this.bumper.d = this.facewidth;
    this.vehicle = new Car(x,y,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11.5, 4.5, 2.3, this.blink, this.cooldown, "Blink", "On Cooldown");
    this.vehicle.phased = false;
    this.vehicle.timer = 0;
    this.vehicle.time = 300;
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
      if (this.timer >= this.time){
        this.phased = false;
        this.abilityBar.TopText = "UNBLINKED";
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

  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn();
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
  }

  // display(playerTrue){
  //   this.vehicle.display(playerTrue);
  // }
}
class Rocket{
  constructor(x,y,lap,rotation){
    this.type = Rocket;
    this.facelength = 19;
    this.facewidth = 19;
    this.bodylength = 16;
    this.bodywidth = 19.5;
    this.bumper = new Sprite(x*big-this.facelength,y*big);
    this.bumper.w = Math.sqrt((this.facewidth+1)**2/2);
    this.bumper.h = Math.sqrt((this.facewidth+1)**2/2);
    this.bumper.rotation = 45;
    this.bumper.drag = 1;
    this.bumper.bounciness = 0;
    everything.push(this.bumper);
    this.lap = lap;
    this.vehicle = new Car(x,y,lap,this.type,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11, 1, 2, this.rocket, this.cooldown,"Rocket","On Cooldown");
    this.front = new GlueJoint(this.bumper,this.vehicle.face);
    this.vehicle.handbrake = false;
    this.vehicle.cooldown = false;
    this.vehicle.timer = 0;
    this.vehicle.time = 200;
  }
  rocket(){
    
    if (!this.cooldown){
      if(this.timer <=0){
        
        this.cooldown = true;
        this.timer = this.time;
        this.body.applyForce(2000);
        
        console.log("rocketed");
      }
    }
  }

  cooldown(){
    if(this.cooldown){
      this.timer --;
      if (this.timer <=0){
        this.cooldown = false;
        console.log("recharged");
      }
    }
  }
  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn();
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
  }
  
  
  // deathTimer(start,num){
  //   while()
  // }

}

class Car{
  constructor(x,y,lap,type,rotation,facelength,facewidth,backlength,backwidth, acceleration, maxspeed, braking, handling, thing, thing2, backText,topText){
    this.body = new Sprite(x*big+backlength/2,y*big);
    this.body.w = backlength;
    this.body.h = backwidth;
    
    everything.push(this.body);
    this.face = new Sprite(x*big-facelength/2,y*big);
    this.face.w = facelength;
    this.face.h = facewidth;
    
    everything.push(this.face);
    this.midsec = new GlueJoint(this.body,this.face);

    this.body.rotateTo(rotation,22);
// this.body.rotation = rotation;
    this.body.drag = 2;
    this.body.rotationDrag = 3;
    this.body.bounciness = 0.8;

    this.face.drag = 2.5;
    this.face.rotationDrag = 2;
    this.face.bounciness = 0.8;

    this.move = 0;
    this.turn = 0;
    this.acceleration = acceleration;
    this.maxspeed = maxspeed;
    this.braking = braking;
    this.handling = handling;

    this.type = type;

    this.checkpoint = 0;
    this.lap = lap;
    this.lapCounter = new Sprite(0,0,60,40);
    this.lapCounter.collider = "none";
    this.lapCounter.text = "Lap:" + this.lap + "/" + laps;
    this.dead = false;
    
    this.respawnCommit = 0;
    this.respawnBar = new Bar(300,20,5,5,"red","R to Respawn", '', respawntime, 0);

    this.thing = thing;
    this.thing2 = thing2;

    this.abilityBar = new Bar(300,20,5,20+this.respawnBar.height, "turquoise", "Press Shift to " + backText, topText,200,0);

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

  die(){
    this.midsec.remove();
    this.tod = millis();
    this.dead = true;
  }
  spikeCheck(){
    for (let part of [this.body,this.face]){
      for (let pokey of spikes){
        if (part.collides(pokey)){
          this.die();
          break;
        }
      }
    }
  }

  spawnCheck(){
    for(let check of checkpoints){
      if(this.face.overlaps(check.spot)||this.body.overlaps(check.spot)){
        if (check.number === this.checkpoint +1){
          this.checkpoint = check.number;
        }
        else if(check.number === 0 && this.checkpoint === checkpoints.length-1){
          this.checkpoint = check.number;
          this.lap ++;
          // console.log("NEW LAP");
          if (this.lap > laps){
            finsished.push(this);
          }
        }
      }
    }
  }

  displayUI(){
    this.lapCounter.x = this.face.x-windowWidth/2+(this.lapCounter.w/2+5);
    this.lapCounter.y = this.face.y-windowHeight/2+(this.lapCounter.h/2+5);
    this.lapCounter.text = "Lap:" + this.lap + "/" + laps;

    this.abilityBar.update(this.timer);
    this.abilityBar.display(this.face);

    this.respawnBar.update(this.respawnCommit)
    this.respawnBar.display(this.face);
  }

  drive() {
    if ( Math.abs(this.move) > 0){
      if((this.hanbrake === false||Math.abs(this.move) > 1.5)){

        if (keyIsDown(65)){
          this.turn -= this.handling*toZero(this.move);
        }
        if (keyIsDown(68)){
          this.turn += this.handling*toZero(this.move);
        }
      
      }
    // else {
    //   console.log("handbrake stopped turning");
    // }
    }
    
    this.body.applyTorque(this.turn/8);
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

    this.body.bearing = this.body.rotation-180;
  
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
  respawn(){
    if(keyIsDown(82)){
      this.respawnCommit += 1;
      if(this.respawnCommit >= respawntime){
        this.respawnCommit = 0;
        cheese = respawn(this.checkpoint,cheese,this.lap, this.type);
      }
    }
    else{
      if(this.respawnCommit >0){
        this.respawnCommit -= 0.5;
      }
    }
  }

}


let big = 1.4;
class Wall{
  constructor(x,y,width,height,rotation, spikes){
    this.cement = new Sprite(x*big,y*big,width*big,height*big);
    this.cement.collider = "static";
    this.cement.rotation = rotation;
    everything.push(this.cement);
  }
}
class SpWall{
  constructor(x,y,amount){
    for (let i = 0; i <= amount; i++){
      let shift = i*10*big;
      let death = new Spike(x+shift,y,0);
      death.metal.rotation = 90;
    }
  }
}
class Bend{
  constructor(x,y,size,angle,start, value, spikes){
    // this.cement = new Sprite(x*big, y*big, [1, -10, size*big, 1, angle]);
    // this.cement.collider = "static";
    
    let space = angle/2;
    let death;
    
    if (value === 1){
      for (let i = start; i <start+angle+space; i++){
        if (spikes === true){
          death = new Spike(x*big-sin(angle-i*space)*13*big*size, y*big-cos(i*space)*13*big*size,i*(space-0)+90);
        }
        this.cement = new Wall(x*big-sin(angle-i*space)*13*big*size, y*big-cos(i*space)*13*big*size,10*size/3*big,10*big, i*(space-space/8)+0);
        everything.push(this.cement.cement);
      }
    }
    else {
      for (let i = start; i >start-angle-space; i--){
        if (spikes === true){
          death = new Spike(x*big-sin(angle-i*space)*13*big*size, y*big-cos(i*space)*13*big*size, i*(space-0)+90);
        }
        this.cement = new Wall(x*big-sin(angle-i*space)*13*big*size, y*big-cos(i*space)*13*big*size,10*size/3*big,10*big, i*(space+space/8)+0);
        everything.push(this.cement.cement);
      }
    }
    // this.cement.rotation = rotation;
    // this.cement.shape = "chain";
    
  }
}
class Spike{
  constructor(x,y,rotation){
    let thing = 20;
    let thang = 6;
    this.metal = new Sprite(x*big,y*big, [
      [thing*big, thang*big],
      [-1*thing*big, thang*big],
      [0, -12*big]
    ]);
    this.metal.collider = "static";
    this.metal.rotation = rotation;
    everything.push(this.metal);
    spikes.push(this.metal);
  }
}


function makecheckP(x,y,angle,list,size){
  let checker = new CheckP(x,y,angle,list.length,size);
  list.push(checker);
}
class CheckP{
  constructor(x,y,angle,number,size){
    this.x = x;
    this.y = y;
    this.spot = new Sprite(x*big,y*big);
    if (number !== 0){
      this.spot.radius = size*big;
    } 
    else {
      this.spot.h = size*big;
      this.spot.w = 10*big;
    }
    this.spot.layer = 0;
    this.spot.rotation = angle;
    this.spot.collider = "none";
    this.number = number;
  }
}

class Bar{
  constructor(width,height,xOffset,yOffset,colour,backText,topText,inmax,barmin){
    this.back = new Sprite(0,0,width,height);
    this.back.collider = "none";
    this.back.color = 'white';
    this.back.stroke = 'black';
    this.back.layer = 4;
    this.backText = backText;
    this.progress = new Sprite(0,0,0,height);
    this.progress.collider = "none";
    this.progress.color = colour;
    this.progress.stroke = 'black';
    this.progress.layer = 4;
    this.topText = topText;
    this.width = width;
    this.height = height;
    this.xOffset =xOffset;
    this.yOffset = yOffset;
    this.inmax = inmax;
    this.barmin = barmin;
  }
  display(face){
    this.back.x = face.x-windowWidth/2+(this.back.w/2+this.xOffset);
    this.back.y = face.y-windowWidth/2+(this.back.h/2+this.yOffset);

    this.progress.x = face.x-windowWidth/2+(this.progress.w/2+this.xOffset);
    this.progress.y = face.y-windowWidth/2+(this.progress.h/2+this.yOffset);
  }
  remove(){
    this.back.remove();
    this.progress.remove();
  }
  update(input){
    let bar = map(input,0,this.inmax,this.barmin,this.width);
    this.progress.w = bar;
    if(this.progress.w >= this.width/3){
      this.progress.text = this.topText;
    }
    else{
      this.progress.text = '';
    }
    if(this.progress.w <= this.barmin){
      this.back.text = this.backText;
    }
    else{
      this.back.text = '';
    }
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