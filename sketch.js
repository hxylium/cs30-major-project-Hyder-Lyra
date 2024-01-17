



let cheese;
let dummy;
let ratio;
let everything = [];
let spikes = [];
let laps = 3;

let finsished = [];

// map
let divider1,divider2,divider3,divider4,eastwall1,westwall1,eastwall2,westwall2,eastwall3;
let south1, south2, south3, south4, south5, south6;
let dwall1,dwall2;


let respawntime = 150;


let checkpoints = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  stroke = 6;
  ratio = smallest();
  ratio = ratio/20;
  
  cheese = makeVehicle(700,380,1,0,Bur,0,"magenta","darkgrey");
  camera.pos = cheese.vehicle.face.pos;
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
  background("lightgrey")
  
  cheese.docar();

  camera.pos = cheese.vehicle.face.pos;
}


function respawn(checkNum,self,lap,type){
  let point = checkpoints[checkNum];
  
  let colourA = self.vehicle.colourA;
  let colourB = self.vehicle.colourB;
  self.vehicle.body.remove();
  self.vehicle.face.remove();
  self.vehicle.respawnBar.remove();
  self.vehicle.lapCounter.remove();
  self.vehicle.abilityBar.remove();
  self.vehicle.speedometer.remove();
  return makeVehicle(point.x,point.y,lap,point.spot.rotation, type,checkNum,colourA,colourB);

}

function makeVehicle(x,y,lap,rotation,type,checkpoint,colourA,colourB){
  let beep = new type(x,y,lap,rotation,checkpoint,colourA,colourB);
  beep.vehicle.dead = false;
  beep.self = beep;
  return beep;
}

class Bubble{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Bubble;
    this.facelength = 13;
    this.facewidth = 18;
    this.bodylength = 18;
    this.bodywidth = 21;
    this.vehicle = new Car(x,y,lap,Bubble,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 8.0, 10.5, 3, 1.0, this.block, this.unblock,"Shield","Protec!",400,checkpoint,colourA,colourB);

    
    this.vehicle.body.rotationDrag = 5;


    this.vehicle.timer = 0;
    this.vehicle.shielded = false;

    this.vehicle.abilityStart = 60;
    this.vehicle.selfDestruct = 0;
  }
  
  block(){
    // make shield
    if (!this.shielded && this.timer <= 0){

      this.timer = this.time;
      this.face.stroke = 'turquoise';
      this.body.stroke = 'turquoise';
      this.shielded = true;

      let mid = this.carCenter();
      // console.log(mid);
      this.shield = new Sprite(mid.x*big, mid.y*big, 10);
      this.shield.bounciness = 10;
      this.shield.layer = 0.5;
      this.shield.drag = 0;
      this.shield.overlaps(this.face);
      this.shield.overlaps(this.body);
      this.shield.colour = "lightblue";
      this.shield.stroke = "turquoise";
      this.handle = new GlueJoint(this.shield, this.body);

      this.face.drag = 0;
      this.body.drag = 0;

    }
  }
  unblock(){
    if (this.shielded){
      this.timer --;
      if(this.timer >=120){
        this.move = 0;
        if (this.timer === 120){
          this.move = 3;
        }
      }

      if(this.timer <= 0){
        this.shielded = false;
      }
      else if (this.timer <= 100 || this.dead){
        this.face.stroke = 'black';
        this.body.stroke = 'black';

        this.shield.remove();
        this.handle.remove();

        this.face.drag = 2.5;
        this.body.drag = 2;
      }
      else if (this.timer <= 120 && this.shield.radius){
        this.shield.radius --;
      }
      else if(this.shield.radius < 31){
        this.shield.radius ++;
        
      }
      
        
      
    }
    
  }


  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    let list = [];
    if (this.vehicle.shielded){
      list = [this.vehicle.shield,this.vehicle.handle];
    }
    this.vehicle.respawn(list);
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
    this.vehicle.specialCleanup();
    this.vehicle.rip();
  }
  
}
class Bur{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Bur;
    this.facelength = 9;
    this.facewidth = 18;
    this.bodylength = 12;
    this.bodywidth = 18;
    this.vehicle = new Car(x,y,lap,Bur,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 7.0, 8.5, 3, 1.0, this.puff, this.unpuff,"Pufferfish","SPIKE!!",300,checkpoint,colourA,colourB);
    this.vehicle.face.mass = 0.5;
    this.vehicle.body.mass = 0.5;
    this.vehicle.face.drag = 1.5;
    this.vehicle.body.rotationDrag = 5;


    this.vehicle.timer = 0;
    this.vehicle.puffed = false;
    this.vehicle.pokeys = [];

    this.vehicle.abilityStart = 60;
    this.vehicle.selfDestruct = 0;
  }
  
  puff(){
    // delay system
    if (this.timer === 0){
      this.timer = this.time - this.abilityStart;
      this.abilityBar.topText = "ready...";
      this.abilityBar.progress.color = 'yellow';
      this.face.stroke = 'yellow';
      this.body.stroke = 'yellow';
    }
    else if(this.timer < this.time && !this.puffed){
      this.timer ++;
    }
    // make spikes
    if (!this.puffed && this.timer === this.time && this.timer !== 0){

      this.abilityBar.topText = "Spiked!";
      this.abilityBar.progress.color = 'pink';
      this.face.stroke = 'pink';
      this.body.stroke = 'pink';

      let mid = this.carCenter();
      // console.log(mid);
      let radius = 21;
  
      this.pokeys.push(new Spike(mid.x-1*radius,mid.y+0*radius,180,true).metal);
      this.pokeys.push(new Spike(mid.x-0.71*radius,mid.y-0.71*radius,225,true).metal);
      this.pokeys.push(new Spike(mid.x+0*radius,mid.y-1*radius,270,true).metal);
      this.pokeys.push(new Spike(mid.x+0.71*radius,mid.y-0.71*radius,315,true).metal);
      this.pokeys.push(new Spike(mid.x+1*radius,mid.y+0*radius,0,true).metal);
      this.pokeys.push(new Spike(mid.x+0.71*radius,mid.y+0.71*radius,45,true).metal);
      this.pokeys.push(new Spike(mid.x+0*radius,mid.y+1*radius,90,true).metal);
      this.pokeys.push(new Spike(mid.x-0.71*radius,mid.y+0.71*radius,135,true).metal);
      let bones = []
      for (let spike of this.pokeys){
        // spike.metal.color = this.body.color;
        spike.color = 'pink';
        bones.push(new GlueJoint(this.face,spike));
        bones.push(new DistanceJoint(this.body,spike));
      }
      for (let item of bones){
        this.pokeys.push(item);
      }
      this.puffed = true;
    }
    // warning system
    if (this.puffed){
      this.abilityBar.topText = "Spiked!";
      this.abilityBar.progress.color = 'pink';
      this.face.stroke = 'pink';
      this.body.stroke = 'pink';
      
      let danger = 0;

      for (let spike of this.pokeys){
        danger += spike.speed;
      }

      danger = danger/8 -this.face.speed;

      if (danger >= 1.0){
        if (this.timer === this.time){
          this.timer = this.time-151;
        }
        this.timer += 2;
        this.abilityBar.topText = "WARNING";
        this.abilityBar.progress.color = "orange";

        this.face.stroke = "orange";
        this.body.stroke = "orange";

        for (let spike of this.pokeys){
          spike.color = "orange";
        }
      }
      
      if (danger >= 10){
        this.abilityBar.topText = "DANGER";
        // flashing colours for late in the danger levels
        let colour = "red";
        let interval = 9;
        if (this.timer >=this.time){
          if (this.timer/interval === Math.floor(this.timer/interval)){
            if (this.abilityBar.progress.color === "yellow"){
              colour = "red";
            }
            else {
              colour = "yellow";

            }
          }
        }

        this.abilityBar.progress.color = colour;

        this.face.stroke = colour;
        this.body.stroke = colour;

        for (let spike of this.pokeys){
          spike.color = colour;
        }
        this.selfDestruct ++;
        if (this.selfDestruct >= 100){
          this.die();
        }
      }
      
    }
  }
  unpuff(){
    if (!keyIsDown(16) && this.timer > 0 || this.dead){

      this.face.stroke = 'black';
      this.body.stroke = 'black';

      if (this.puffed){
        for (let spike of this.pokeys){
          spike.remove();
        }
      }
      this.pokeys = [];
      this.selfDestruct = 0;
      this.timer = 0;
      this.puffed = false;
    }
    
  }


  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn(this.vehicle.pokeys);
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
    this.vehicle.specialCleanup();
    this.vehicle.rip();
  }
  
}
class Swing{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Swing;
    this.facelength = 18;
    this.facewidth = 15;
    this.bodylength = 18;
    this.bodywidth = 18;
    this.vehicle = new Car(x,y,lap,Swing,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 7.5, 11.5, 3, 1.4, this.grapple, this.ungrapple,"Grapple","SWINGIN'!!",300,checkpoint,colourA,colourB);

    this.vehicle.timer = 0;
    this.vehicle.grappled = false;
  }
  
  grapple(){
    if (!this.grappled){
      this.hook = new Sprite(mouse.x,mouse.y,0);
      this.hook.collider ='k';
      // for (let item of everything){
      //   this.hook.overlaps(item);
      // }
      this.towlineA = new DistanceJoint(this.face,this.hook);
      this.towlineB = new DistanceJoint(this.body,this.hook);
      
      this.face.stroke = "lime";
      this.body.stroke = "lime";

      // this.towlineA.springiness = 1;
      // this.towlineB.springiness = 1;
      this.timer = 300;
      this.grappled = true;
    }
  }
  ungrapple(){
    if (!keyIsDown(16) && this.grappled || this.dead){
      this.hook.remove();
      this.towlineA.remove();
      this.towlineB.remove();
      this.timer = 0;
      this.grappled = false;
      this.face.stroke = "black";
      this.body.stroke = "black";
    }
    
  }


  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    let list = [];
    if (this.vehicle.grappled){
      list = [this.vehicle.towlineA, this.vehicle.towlineB,this.vehicle.hook];
    }
    this.vehicle.respawn(list);
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
    this.vehicle.specialCleanup();
    this.vehicle.rip();
  }
  
}
class Sport{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Sport;
    this.facelength = 15;
    this.facewidth = 19.5;
    this.bodylength = 16;
    this.bodywidth = 20;
    this.vehicle = new Car(x,y,lap,Sport,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 10, 16, 0.5, 2.5, this.hbrake, this.unhbrake, "Handbrake","HANDBRAKE!!",300,checkpoint,colourA,colourB);
    this.vehicle.bumper = new Sprite(x*big-this.facelength,y*big);
    this.vehicle.bumper.d = this.facewidth;
    this.vehicle.bumper.drag = 2.5;
    this.vehicle.bumper.bounciness = 0.8;
    this.vehicle.bumper.color = colourB;
    this.vehicle.bumper.layer = 0.5
    everything.push(this.vehicle.bumper);

    this.front = new GlueJoint(this.vehicle.bumper,this.vehicle.face);

    this.vehicle.handbrake = false;
    this.vehicle.timer = 0;
    // this.vehicle.abilityBar.barmin =20;
  }
  hbrake(){
    // handbrake
    this.timer = 300;
    for (let i = 0; i < 20; i++){
      this.move -= toZero(this.move);
    }
    this.body.speed -= toZero(this.body.speed)*10**-1;

    this.face.stroke = "brown";
    this.body.stroke = "brown";
    this.bumper.stroke = "brown";
    
    // console.log("handbrake");
  }
  unhbrake(){
    if (!keyIsDown(16)){
      this.timer = 0;
      this.face.stroke = "black";
      this.body.stroke = "black";
      this.bumper.stroke = "black";
    }
    this.handbrake = false;
  }
  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn([this.vehicle.bumper,this.front]);
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
    this.vehicle.specialCleanup();
    this.vehicle.rip();
    if (this.vehicle.dead){
      this.bumper.color = "black";
      this.bumper.stroke = "darkgrey";
    }
  }
}
class Delor{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Delor;
    this.facelength = 15;
    this.facewidth = 19;
    this.bodylength = 23;
    this.bodywidth = 20;
    // this.bumper = new Sprite(x+this.facelength,y);
    // this.bumper.d = this.facewidth;
    this.vehicle = new Car(x,y,lap,Delor,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11.5, 4.5, 2.3, this.blink, this.recharge, "Blink", "On Cooldown",350,checkpoint,colourA,colourB);
    this.vehicle.phased = false;
    this.vehicle.timer = 0;
    this.vehicle.abilityStop = 190;
    this.vehicle.body.layer = 2;
    this.vehicle.face.layer = 2;
    // this.front = new GlueJoint(this.bumper,this.vehicle.face);
  }

  blink(){
    if (!this.phased && this.timer <= 0){
        this.phased = true;
        this.timer = 350;
        this.body.stroke = 'yellow';
        this.face.stroke = 'yellow';
        // for (let item of everything){
        //   this.body.overlaps(item);
        //   this.face.overlaps(item);
        // }
        this.body.collider = "none";
        this.face.collider = "none";
        this.abilityBar.topText = "Blinked";
        this.abilityBar.progress.color = "yellow";
        // console.log("blinked");
    }
  }
  recharge(){
    if(this.phased){
      this.timer --;
      if (this.timer <= this.time-this.abilityStop){
        this.phased = false;
        this.body.stroke = 'black';
        this.face.stroke = 'black';
        this.abilityBar.topText = "UNBLINKED";
        this.abilityBar.progress.color = 'red';
        // for (let item of everything){
        //   this.body.collides(item);
        //   this.face.collides(item);
        // }
        this.body.collider = "d";
        this.face.collider = "d";
      }
      else if (this.timer <= this.time-this.abilityStop+40){
        this.abilityBar.progress.color = "orange";     
        this.body.stroke = 'orange';
        this.face.stroke = 'orange';
      }
      else if (this.timer <= this.time-this.abilityStop+70){
        this.abilityBar.progress.color = "gold";
        this.body.stroke = 'gold';
        this.face.stroke = 'gold';
      }
    }
    else{
      if (this.timer <=0){
        // this.abilityBar.topText = "Blinked";
        // this.abilityBar.progress.color = "yellow";
      }
      else{
        this.timer --;
      }
    }
  }

  docar(){
    this.vehicle.spawnCheck();
    // if(!this.vehicle.phased){
      this.vehicle.spikeCheck();
    // }
    this.vehicle.respawn([]);
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
    this.vehicle.specialCleanup();
    this.vehicle.rip();
  }

  // display(playerTrue){
  //   this.vehicle.display(playerTrue);
  // }
}
class Rocket{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Rocket;
    this.facelength = 19;
    this.facewidth = 19;
    this.bodylength = 16;
    this.bodywidth = 19.5;
    this.lap = lap;
    this.vehicle = new Car(x,y,lap,this.type,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11, 1, 2, this.rocket, this.recharge,"Rocket","On Cooldown",200,checkpoint,colourA,colourB);
    
    this.vehicle.bumper = new Sprite(x*big-this.facelength,y*big);
    this.vehicle.bumper.w = Math.sqrt((this.facewidth+4)**2/2);
    this.vehicle.bumper.h = Math.sqrt((this.facewidth+4)**2/2);
    this.vehicle.bumper.rotation = 45;
    this.vehicle.bumper.drag = 1;
    this.vehicle.bumper.bounciness = 0;
    this.vehicle.bumper.color = colourB;
    everything.push(this.vehicle.bumper);
    
    this.front = new GlueJoint(this.vehicle.bumper,this.vehicle.face);
    this.vehicle.handbrake = false;
    this.vehicle.cooldown = false;
  }
  rocket(){
    
    if (!this.cooldown){
      if(this.timer <=0){
        
        this.cooldown = true;
        this.timer = this.time;
        this.body.applyForce(2000);
        if (this.move < 8){
          this.move = 8;
        }

        this.body.stroke = "purple";
        this.face.stroke = "purple";
        this.bumper.stroke = "purple";
        
        console.log("rocketed");
      }
    }
  }

  recharge(){
    if(this.cooldown){
      this.timer --;
      if (this.timer <= this.time*2/3){
        this.body.stroke = "black";
        this.face.stroke = "black";
        this.bumper.stroke = "black";
      }
      if (this.timer <=0){
        this.cooldown = false;
        // console.log("recharged");
      }
    }
  }
  docar(){
    this.vehicle.spawnCheck();
    this.vehicle.spikeCheck();
    this.vehicle.respawn([this.vehicle.bumper,this.front]);
    this.vehicle.displayUI();
    if (!this.vehicle.dead){
      this.vehicle.drive();
    }
    this.vehicle.specialCleanup();
    this.vehicle.rip();
    if (this.vehicle.dead){
      this.bumper.color = "black";
      this.bumper.stroke = "darkgrey";
    }
  }

}

class Car{
  constructor(x,y,lap,type,rotation,facelength,facewidth,backlength,backwidth, acceleration, maxspeed, braking, handling, thing, thing2, backText,topText, abilityTime, checkpoint, colourA, colourB){
    this.body = new Sprite(x*big+backlength/2,y*big);
    this.body.w = backlength;
    this.body.h = backwidth;

    this.body.color = colourA;
    
    everything.push(this.body);
    this.face = new Sprite(x*big-facelength/2,y*big);
    this.face.w = facelength;
    this.face.h = facewidth;

    this.face.color = colourB;
    
    everything.push(this.face);
    this.midsec = new GlueJoint(this.body,this.face);

    this.colourA = colourA;
    this.colourB = colourB;
    
  
    // this.body.rotateTo(rotation,22);

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

    this.checkpoint = checkpoint;
    this.lap = lap;
    this.lapCounter = new Sprite(0,0,60,40);
    this.lapCounter.collider = "none";
    this.lapCounter.color = 'green';
    this.lapCounter.text = "Lap:" + this.lap + "/" + laps;
    this.dead = false;
    
    this.respawnCommit = 0;
    // Sport's shorter respawn time
    this.respawnMod = 1;
    if(this.type === Sport){
      this.respawnMod = 2;
    }
    this.respawnBar = new Bar(300,20,5,10+this.lapCounter.h,"red","R to Respawn", "", respawntime, 0);
    

    this.thing = thing;
    this.thing2 = thing2;

    this.abilityBar = new Bar(300,20,5,10+this.respawnBar.height+this.respawnBar.yOffset, "turquoise", "Press Shift to " + backText, topText,abilityTime,0);
    this.timer = 0;
    this.time = abilityTime;

    this.speedometer = new Bar(270,35,5, 10+this.abilityBar.height+this.abilityBar.yOffset, "yellow", "W = Gas, ' '=Reverse", "",16,0);

  }

  special(){
    this.thing();
  }
  specialCleanup(){
    this.thing2();
  }

  carCenter(){
    return {x:(this.body.x/big+this.face.x/big)/2, y: (this.body.y/big+this.face.y/big)/2};
  }

  die(){
    this.midsec.remove();
    this.dead = true;
  }
  rip(){
    if (this.dead){
      this.face.color = "black";
      this.body.color = "black";
      this.face.stroke = "darkgrey";
      this.body.stroke = "darkgrey";
      
    }
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

    this.respawnBar.update(this.respawnCommit);
    this.respawnBar.display(this.face);

    // let avspeed = Math.floor((this.body.speed+this.face.speed)/2*10)/10;
    let avspeed = Math.abs(Math.floor(this.move*10)/10);
    this.speedometer.update(avspeed);
    if(avspeed >= 1){
      if(this.move === this.maxspeed){
        avspeed = avspeed + " @ Max"; 
        this.speedometer.progress.color = "gold";
      }
      else{
        this.speedometer.progress.color = "yellow";
      }
    }
    else{
      avspeed = "";
      this.speedometer.progress.color = "yellow";
    }
    this.speedometer.progress.text = avspeed;
    this.speedometer.display(this.face);
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
    // //special cleanup
    // if (this.thing2 !== null){
    //   this.specialCleanup();
    // }

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
  respawn(extraRemove){
    if(keyIsDown(82)){
      this.respawnCommit += this.respawnMod;
      if(this.respawnCommit >= respawntime){
        this.respawnCommit = 0;
        for (let item of extraRemove){
          item.remove();
        }
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
  constructor(x,y,width,height,rotation){
    this.cement = new Sprite(x*big,y*big,width*big,height*big);
    this.cement.collider = "static";
    this.cement.rotation = rotation;
    this.cement.layer = 1;
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
  constructor(x,y,rotation,puff){
    let thing = 20;
    let thang = 6;
    let mode;
    if (puff){
      mode = 'dynamic';
    }
    else{
      mode = 'static';
    }
    this.metal = new Sprite(x*big,y*big, [
      [thing*big, thang*big],
      [-1*thing*big, thang*big],
      [0, -12*big]
    ],mode);
    this.metal.mass = 0;
    this.metal.drag = -1;
    
    this.metal.rotation = rotation;
    this.metal.layer = 0.2
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
    this.spot.color = 'grey';
    this.number = number;
  }
}

class Bar{
  constructor(width,height,xOffset,yOffset,colour,backText,topText,inmax){
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
    this.progress.layer = 5;
    this.topText = topText;
    this.width = width;
    this.height = height;
    this.xOffset =xOffset;
    this.yOffset = yOffset;
    this.inmax = inmax;
  }
  display(face){
    this.back.x = face.x-windowWidth/2+(this.back.w/2+this.xOffset);
    this.back.y = face.y-windowHeight/2+(this.back.h/2+this.yOffset);

    this.progress.x = face.x-windowWidth/2+(this.progress.w/2+this.xOffset);
    this.progress.y = face.y-windowHeight/2+(this.progress.h/2+this.yOffset);
  }
  remove(){
    this.back.remove();
    this.progress.remove();
  }
  update(input){
    let bar = map(input,0,this.inmax,0,this.width);
    this.progress.w = bar;
    if(this.progress.w >= this.width/3){
      this.progress.text = this.topText;
    }
    else{
      this.progress.text = "";
    }
    if(this.progress.w <= 0){
      this.back.text = this.backText;
    }
    else{
      this.back.text = "";
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