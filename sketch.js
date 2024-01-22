//Deifnes necessary variables for the cars
let cheese;
let dummy;
let ratio;
let big = 1.4;

// Defines all the lists needed for the physics for the cars
let everything = [];
let spikes = [];
let laps = 3;
let finsished = [];
let respawntime = 150;
let checkpoints = [];
let starts = [];
let players = [];

// Defines variables for the menu screens
let back;
let loading;
let play;
let customize;
let tutorial;
let gameState = "Initialize";
let track1, track2;
let colour1, colour2, submitButton;
let colour1chosen, colour2chosen;
let colorChosen;
let bubble, saw, swing, sport, delor, rocket;
let buttons = [];

// Colours for car customization
let colours = ["red","darkred","pink",
  "orange","darkorange","gold","yellow",
  "green","darkgreen","lightgreen","lime",
  "blue","darkblue","navy","lightblue","turquoise",
  "purple","indigo","violet","magenta",
  "grey","darkgrey","lightgrey","white",
  "brown","tan"];
 

// Preloads the background image
function preload(){
  back = loadImage("Background image.png");
  loading = loadImage("loading.jpeg");
}

// Initial setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  initialization();
}

// Function that initalizes code and ready's the buttons
function initialization(){
  preload();
  image(back, 0, 0, width, height+100);

  // Creating buttons for the menu
  play = createButton("Play (Default Car & Track)");
  play.position(width/2-width/6/2, height/3);
  play.size(width/6, 60);
  play.style("background-color", "yellow");
  play.style("border-radius", "26px");

  customize = createButton("Custom");
  customize.position(width/2-width/6/2, height-height/2);
  customize.size(width/6, 60);
  customize.style("background-color", "green");
  customize.style("border-radius", "26px");


  // Creating buttons for the track choice
  track1 = createButton("A proper Racing track to race on!");
  track1.position(width/3-width/6/2, height/3);
  track1.size(width/6, 60);
  track1.style("background-color", "lightgreen");
  track1.style("border-radius", "26px");

  track2 = createButton("A fun little obstacle avoidance track");
  track2.position(width-width/3-width/6/2, height/3);
  track2.size(width/6, 60);
  track2.style("background-color", "lightblue");
  track2.style("border-radius", "26px");


  // Creating buttons for the car choices
  bubble = createButton("Bubble Van");
  bubble.position(50, height/3);
  bubble.size(200, 60);
  bubble.style("border-radius", "26px");

  saw = createButton("Saw Car");
  saw.position(300, height/3);
  saw.size(200, 60);
  saw.style("border-radius", "26px");
  
  swing = createButton("Swinging Car");
  swing.position(550, height/3);
  swing.size(200, 60);
  swing.style("border-radius", "26px");

  sport = createButton("Sports Car");
  sport.position(800, height/3);
  sport.size(200, 60);
  sport.style("border-radius", "26px");

  delor = createButton("Delor Car");
  delor.position(1050, height/3);
  delor.size(200, 60);
  delor.style("border-radius", "26px");

  rocket = createButton("Rocket Car");
  rocket.position(1300, height/3);
  rocket.size(200, 60);
  rocket.style("border-radius", "26px");


  play.hide();
  customize.hide();

  bubble.hide();
  saw.hide();
  swing.hide();
  sport.hide();
  delor.hide();
  rocket.hide();

  track1.hide();
  track2.hide();

  gameState = "menu";
}

// Main function that draws everything and runs the game
function draw() {
  if(gameState === "playing"){
    createCanvas(windowWidth, windowHeight);
    clear();
    background("lightgrey");
    
    cheese.docar();
    
    let mid = cheese.vehicle.carCenter();
    camera.x = mid.x*big;
    camera.y = mid.y*big;
  }
  else if(gameState === "menu"){
    startGame();
  }
}

// text for choosing the cars
function choosingCars(){
  textSize(16);
  textAlign(LEFT);

  text("Speciality: Creates a bouncy field around you", 56, height/3+80, width/6-60, height/3+80);
  text("Speciality: Become a saw", 306, height/3+80, width/6-56, height/3+80);
  text("Speciality: Grapple onto things", 556, height/3+80, width/6+60, height/3+80);
  text("Speciality: Handbrake and quick respawn", 806, height/3+80, width/6-60, height/3+80);
  text("Speciality: Ghost mode", 1056, height/3+80, width/6-100, height/3+80);
  text("Speciality: Dash forward with tremendous speed", 1306, height/3+80, width/6-29, height/3+80);

  text("Acceleration: 9.5", 56, height/3+120, width/6-60, height/3+80);
  text("Acceleration: 7", 306, height/3+120, width/6-56, height/3+80);
  text("Acceleration: 7.5", 556, height/3+120, width/6+60, height/3+80);
  text("Acceleration: 10", 806, height/3+120, width/6-60, height/3+80);
  text("Acceleration: 9.5", 1056, height/3+120, width/6-100, height/3+80);
  text("Acceleration: 9.5", 1306, height/3+120, width/6-29, height/3+80);

  text("Max Speed: 10.5", 56, height/3+140, width/6-60, height/3+80);
  text("Max Speed: 8.5", 306, height/3+140, width/6-56, height/3+80);
  text("Max Speed: 11.5", 556, height/3+140, width/6+60, height/3+80);
  text("Max Speed: 16", 806, height/3+140, width/6-60, height/3+80);
  text("Max Speed: 11.5", 1056, height/3+140, width/6-100, height/3+80);
  text("Max Speed: 11", 1306, height/3+140, width/6-29, height/3+80);

  text("Braking: 3", 56, height/3+160, width/6-60, height/3+80);
  text("Braking: 3", 306, height/3+160, width/6-56, height/3+80);
  text("Braking: 3", 556, height/3+160, width/6+60, height/3+80);
  text("Braking: 6.5", 806, height/3+160, width/6-60, height/3+80);
  text("Braking: 4.5", 1056, height/3+160, width/6-100, height/3+80);
  text("Braking: 1", 1306, height/3+160, width/6-29, height/3+80);

  text("Handling: 1", 56, height/3+180, width/6-60, height/3+80);
  text("Handling: 1", 306, height/3+180, width/6-56, height/3+80);
  text("Handling: 1.4", 556, height/3+180, width/6+60, height/3+80);
  text("Handling: 2.5", 806, height/3+180, width/6-60, height/3+80);
  text("Handling: 2.3", 1056, height/3+180, width/6-100, height/3+80);
  text("Handling: 2", 1306, height/3+180, width/6-29, height/3+80);
}

// Menu starting screen for the game
function startGame(){
  image(back, 0, 0, width, height+100);

  play.show();
  customize.show();

  play.mousePressed(function() {
    play.hide();
    customize.hide();

    initializeGame("Int", Bubble, "magenta", "lime");
  });

  customize.mousePressed(function() {
    play.hide();
    customize.hide();

    chooseColor();
  });
}

// Makes buttons and text for choosing the color of the car from the pre-defined colors
function chooseColor(){
  background(200);
  gameState = "entering";
  textSize(20);
  textAlign(CENTER);
  text("Choose a color for your vehicle!", width/2, height/2);

  for (let i = 0; i < colours.length; i++) {
    let buttonX = width / 3;
    let buttonY = (i + 1) * height / (colours.length + 1);

    let button = createButton(colours[i]);
    button.position(buttonX - button.width / 2, buttonY - button.height / 2);
    button.style("background-color", colours[i]);
    button.style("border-radius", "10px");
    
    button.mousePressed(() => {
      colorChosen = colours[i];
      console.log("Color chosen:", colorChosen);
      hideColorButtons();
    });

    buttons.push(button);
  }
}

// Hides all of the color buttons and calls the chooseTrack function
function hideColorButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].hide();
  }
  chooseTrack();
}

// Makes buttons and text for choosing the track
function chooseTrack(){
  image(back, 0, 0, width, height+100);
  gameState = "entering";

  track1.show();
  track2.show();

  track1.mousePressed(function() {
    track1.hide();
    track2.hide();
    setParameters("Int", colorChosen);
  });

  track2.mousePressed(function() {
    track1.hide();
    track2.hide();
    setParameters("BnF", colorChosen);
  });
}

// Sets the parameters for the game
function setParameters(track, color){
  image(back, 0, 0, width, height);
  bubble.show();
  saw.show();
  swing.show();
  sport.show();
  delor.show();
  rocket.show();

  choosingCars();

  bubble.mousePressed(function() {
    bubble.hide();
    saw.hide();
    swing.hide();
    sport.hide();
    delor.hide();
    rocket.hide();

    initializeGame(track, Bubble, color, color);
  });

  saw.mousePressed(function() {
    bubble.hide();
    saw.hide();
    swing.hide();
    sport.hide();
    delor.hide();
    rocket.hide();

    initializeGame(track, Saw, color, color);
  });

  swing.mousePressed(function() {
    bubble.hide();
    saw.hide();
    swing.hide();
    sport.hide();
    delor.hide();
    rocket.hide();

    initializeGame(track, Swing, color, color);
  });

  sport.mousePressed(function() {
    bubble.hide();
    saw.hide();
    swing.hide();
    sport.hide();
    delor.hide();
    rocket.hide();
    
    initializeGame(track, Sport, color, color);
  });
  delor.mousePressed(function() {
    bubble.hide();
    saw.hide();
    swing.hide();
    sport.hide();
    delor.hide();
    rocket.hide();
    
    initializeGame(track, Delor, color, color);
  });
  rocket.mousePressed(function() {
    bubble.hide();
    saw.hide();
    swing.hide();
    sport.hide();
    delor.hide();
    rocket.hide();
    
    initializeGame(track, Rocket, color, color);
  });

}

// Function that makes the track
function initializeGame(trackChoice, carChoice, color1, color2){
  prepareRace(trackChoice,carChoice, color1, color2);
  gameState = "playing";
}

// Function that prepares the race by calling every funtion needed
function prepareRace(race,carType,colourA,colourB){
  makeTrack(race);
  cheese = makeVehicle(starts[0].x,starts[0].y,1,starts[0].rotation,carType,0,colourA,colourB);
  players.push(cheese);
}

// Respawn funtion for the cars
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
  return makeVehicle(point.x,point.y,lap,point.rotation, type,checkNum,colourA,colourB);

}

// Make the car with its properties specified by the user
function makeVehicle(x,y,lap,rotation,type,checkpoint,colourA,colourB){
  let beep = new type(x,y,lap,rotation,checkpoint,colourA,colourB);
  beep.vehicle.dead = false;
  beep.self = beep;
  return beep;
}

// Bubble car class
class Bubble{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Bubble;
    this.facelength = 13;
    this.facewidth = 18;
    this.bodylength = 18;
    this.bodywidth = 21;
    this.vehicle = new Car(x,y,lap,Bubble,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 8.0, 10.5, 3, 1.0, this.block, this.unblock,"Shield","Protec!",400,checkpoint,colourA,colourB,"turquoise");

    
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
      this.face.stroke = "turquoise";
      this.body.stroke = "turquoise";
      this.shielded = true;

      let mid = this.carCenter();
      // console.log(mid);
      this.shield = new Sprite(mid.x*big, mid.y*big, 10);
      this.shield.bounciness = 3;
      this.shield.layer = 0.5;
      this.shield.drag = 0;
      this.shield.mass = 1.0;
      this.shield.rotationDrag = 1;

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
      if(this.timer >120 && this.timer < this.time-50){
        this.move = 0;
        // if (this.timer === 120){
        //   this.move = 3;
        // }
      }
      else if(this.shielded){
        if(this.move < 3 && keyIsDown(87)){
          
          this.move = 3;
          
        }
        else if (this.move > -1.6 && keyIsDown(32)){
          this.move = -1.6;
        }
      }

      if(this.timer <= 0){
        this.shielded = false;
      }
      else if (this.timer <= 100 || this.dead){
        this.face.stroke = "black";
        this.body.stroke = "black";

        this.shield.remove();
        this.handle.remove();

        this.face.drag = 2.5;
        this.body.drag = 2;

        this.face.collider ="d";
        this.body.collider ="d";
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
    if(!this.vehicle.finished){
      this.vehicle.spawnCheck();
      if (!this.vehicle.shielded || this.vehicle.shield.radius < 31){
        this.vehicle.spikeCheck();
      }
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
  
}

// Saw car class
class Saw{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Saw;
    this.facelength = 9;
    this.facewidth = 18;
    this.bodylength = 12;
    this.bodywidth = 18;
    this.vehicle = new Car(x,y,lap,Saw,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 7.0, 8.5, 3, 1.0, this.puff, this.unpuff,"Pufferfish","SPIKE!!",500,checkpoint,colourA,colourB,"pink");
    this.vehicle.face.mass = 0.5;
    this.vehicle.body.mass = 0.5;
    this.vehicle.face.drag = 1.5;
    this.vehicle.body.rotationDrag = 5;


    this.vehicle.timer = 0;
    this.vehicle.puffed = false;
    this.vehicle.pokeys = [];

    this.vehicle.abilityStart = 60;
    this.vehicle.cooldown = false;
  }
  
  puff(){
    // delay system
    if(!this.cooldown){
      if (this.timer === 0 && !this.puffed){
        this.timer = this.time - this.abilityStart;
        this.abilityBar.topText = "ready...";
        this.abilityBar.progress.color = "yellow";
        this.face.stroke = "yellow";
        this.body.stroke = "yellow";
      }
      else if(this.timer < this.time && !this.puffed){
        this.timer ++;
      }
      // make spikes
      if (!this.puffed && this.timer === this.time && this.timer !== 0){

        this.abilityBar.topText = "Spiked!";
        this.abilityBar.progress.color = "pink";
        this.face.stroke = "pink";
        this.body.stroke = "pink";

        let mid = this.carCenter();
        // console.log(mid);
        let radius = 20;
        this.center = new Sprite(mid.x*big,mid.y*big,1);
      
        // this.pokeys[0].mass =
        this.pokeys.push(new Spike(mid.x-1*radius,mid.y+0*radius,180,true).metal);
        this.pokeys.push(new Spike(mid.x-0.71*radius,mid.y-0.71*radius,225,true).metal);
        this.pokeys.push(new Spike(mid.x+0*radius,mid.y-1*radius,270,true).metal);
        this.pokeys.push(new Spike(mid.x+0.71*radius,mid.y-0.71*radius,315,true).metal);
        this.pokeys.push(new Spike(mid.x+1*radius,mid.y+0*radius,0,true).metal);
        this.pokeys.push(new Spike(mid.x+0.71*radius,mid.y+0.71*radius,45,true).metal);
        this.pokeys.push(new Spike(mid.x+0*radius,mid.y+1*radius,90,true).metal);
        this.pokeys.push(new Spike(mid.x-0.71*radius,mid.y+0.71*radius,135,true).metal);
        let bones = [];
        let spike,nspike;
        let num = 0;
        for (let number in this.pokeys){
        // console.log(number);
          spike = this.pokeys[number];
          if(num === this.pokeys.length-2){
            nspike = this.pokeys[0];
          // console.log('spiky last');
          }
          else if(num === 0){
            nspike = this.pokeys[this.pokeys.length-1];
          // console.log("spiky 0");
          }
          else{
            nspike = this.pokeys[number-1];
          // console.log("spiky")
          }
          // console.log(nspike)
          // spike.metal.color = this.body.color;
          spike.color = "pink";
          bones.push(new GlueJoint(this.center,spike));
          bones.push(new GlueJoint(spike,nspike));
          // bones[num].springiness = 0.2;
          // bones.push(new DistanceJoint(this.body,spike));
          num ++;
        }
        this.pokeys.push(this.center);
        this.pokeys.push(new DistanceJoint(this.center,this.face));
        this.pokeys.push(new DistanceJoint(this.center,this.body));
        for (let item of bones){
          this.pokeys.push(item);
        }
      
        this.puffed = true;
        this.timer = 0;
      }
      // warning system
      if (this.puffed){
        this.abilityBar.topText = "Spiked!";
        this.abilityBar.progress.color = "pink";
        this.face.stroke = "pink";
        this.body.stroke = "pink";

        // this.pokeys[0].bearing = this.pokeys[0].rotation+90;
        // this.pokeys[0].applyForce(10**1);
        this.center.applyTorque(5*10**-2);
        // let danger = this.center.rotationSpeed;

        // let danger = 0;

        // for (let spike of this.pokeys){
        //   danger += spike.speed;
        // }

        // danger = danger/8 -this.face.speed;
        this.timer ++;

        if (this.timer >= this.time/3){
          this.abilityBar.topText = "WARNING";
          this.abilityBar.progress.color = "orange";

          this.face.stroke = "orange";
          this.body.stroke = "orange";

          for (let spike of this.pokeys){
            spike.color = "orange";
          }
        }
      
        if (this.timer >= this.time*2/3){
          this.abilityBar.topText = "DANGER";
          // flashing colours for late in the danger levels
          let colour = "red";
          let interval = 10;
        
          if (this.timer >=this.time){
          // if (this.interval === 0){
          //   this.interval = interval;
           
            // }
          
            // this.interval --;
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
          // this.selfDestruct ++;
          if (this.timer >= this.time + 150){
            this.die();
          }
        }
      
      }
    }
  }
  unpuff(){
    if (!keyIsDown(16) && this.timer > 0 && !this.cooldown|| this.dead){

      this.face.stroke = "black";
      this.body.stroke = "black";

      if (this.puffed){
        for (let spike of this.pokeys){
          spike.remove();
        }
      }
      this.pokeys = [];
      if(this.puffed){
        this.puffed = false;
        this.cooldown = true;
        this.timer = this.time;
      }
      else{
        this.timer = 0;
      }
      this.abilityBar.progress.color = "pink";
      this.abilityBar.topText = "On Cooldown";
    }
    if (this.cooldown){
      this.timer -= 1.5;
      console.log(this.cooldown);
      if(this.timer <= 0){
        this.timer = 0;
        this.cooldown = false;
      }
    }
    
  }


  docar(){
    if(!this.vehicle.finished){
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
  
}

// Swing car class
class Swing{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Swing;
    this.facelength = 18;
    this.facewidth = 15;
    this.bodylength = 18;
    this.bodywidth = 18;
    this.vehicle = new Car(x,y,lap,Swing,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 7.5, 11.5, 3, 1.4, this.grapple, this.ungrapple,"Grapple","SWINGIN'!!",300,checkpoint,colourA,colourB,"lime");

    this.vehicle.timer = 0;
    this.vehicle.grappled = false;
  }
  
  grapple(){
    if (!this.grappled){
      this.hook = new Sprite(mouse.x,mouse.y,0);
      this.hook.collider ="k";
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
    if(!this.vehicle.finished){
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
  
}

// Sports car class
class Sport{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Sport;
    this.facelength = 15;
    this.facewidth = 19.5;
    this.bodylength = 16;
    this.bodywidth = 20;
    this.vehicle = new Car(x,y,lap,Sport,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 10, 16, 6.5, 2.5, this.hbrake, this.unhbrake, "Handbrake","HANDBRAKE!!",300,checkpoint,colourA,colourB,"tan");
    if(rotation === 0){
      this.vehicle.bumper = new Sprite(x*big+this.facelength,y*big);
    }
    else if(rotation === 90){
      this.vehicle.bumper = new Sprite(x*big,y*big+this.facelength);
    }
    else if(rotation === 180){
      this.vehicle.bumper = new Sprite(x*big-this.facelength,y*big);
    }
    else if(rotation === 270){
      this.vehicle.bumper = new Sprite(x*big,y*big-this.facelength);
    }
    this.vehicle.bumper.d = this.facewidth;
    this.vehicle.bumper.drag = 2.5;
    this.vehicle.bumper.bounciness = 0.8;
    this.vehicle.bumper.color = colourB;
    this.vehicle.bumper.layer = 0.5;
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
    if(!this.vehicle.finished){
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
        this.vehicle.bumper.color = "black";
        this.vehicle.bumper.stroke = "darkgrey";
      }
    }
  }
}

// Delor car class
class Delor{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Delor;
    this.facelength = 15;
    this.facewidth = 19;
    this.bodylength = 23;
    this.bodywidth = 20;
    // this.bumper = new Sprite(x+this.facelength,y);
    // this.bumper.d = this.facewidth;
    this.vehicle = new Car(x,y,lap,Delor,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11.5, 4.5, 2.3, this.blink, this.recharge, "Blink", "On Cooldown",350,checkpoint,colourA,colourB,"yellow");
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
      this.body.stroke = "gold";
      this.face.stroke = "gold";
      this.body.collider = "none";
      this.face.collider = "none";
      this.abilityBar.topText = "Blinked";
      this.abilityBar.progress.color = "gold";
      // console.log("blinked");
    }
  }
  recharge(){
    if(this.phased){
      this.timer --;
      if (this.timer <= this.time-this.abilityStop){
        this.phased = false;
        this.body.stroke = "black";
        this.face.stroke = "black";
        this.abilityBar.topText = "UNBLINKED";
        this.abilityBar.progress.color = "red";
        this.body.collider = "d";
        this.face.collider = "d";
      }
      else if (this.timer <= this.time-this.abilityStop+40){
        this.abilityBar.progress.color = "darkorange";     
        this.body.stroke = "darkorange";
        this.face.stroke = "darkorange";
      }
      else if (this.timer <= this.time-this.abilityStop+70){
        this.abilityBar.progress.color = "orange";
        this.body.stroke = "orange";
        this.face.stroke = "orange";
      }
    }
    else{
      if (this.timer <=0){
        // this.abilityBar.topText = "Blinked";
      }
      else{
        this.timer --;
      }
    }
  }

  docar(){
    if(!this.vehicle.finished){
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
  }

  // display(playerTrue){
  //   this.vehicle.display(playerTrue);
  // }
}

// Rocket car class
class Rocket{
  constructor(x,y,lap,rotation,checkpoint,colourA,colourB){
    this.type = Rocket;
    this.facelength = 19;
    this.facewidth = 19;
    this.bodylength = 16;
    this.bodywidth = 19.5;
    this.lap = lap;
    this.vehicle = new Car(x,y,lap,this.type,rotation,this.facelength,this.facewidth,this.bodylength,this.bodywidth, 9.5, 11, 1, 2, this.rocket, this.recharge,"Rocket","On Cooldown",200,checkpoint,colourA,colourB,"violet");
    if(rotation === 0){
      this.vehicle.bumper = new Sprite(x*big+this.facelength,y*big);
    }
    else if(rotation === 90){
      this.vehicle.bumper = new Sprite(x*big,y*big+this.facelength);
    }
    else if(rotation === 180){
      this.vehicle.bumper = new Sprite(x*big-this.facelength,y*big);
    }
    else if(rotation === 270){
      this.vehicle.bumper = new Sprite(x*big,y*big-this.facelength);
    }
    
    this.vehicle.bumper.w = Math.sqrt((this.facewidth+4)**2/2);
    this.vehicle.bumper.h = Math.sqrt((this.facewidth+4)**2/2);
    this.vehicle.bumper.rotation = 45+rotation;
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
    if(!this.vehicle.finished){
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
        this.vehicle.bumper.color = "black";
        this.vehicle.bumper.stroke = "darkgrey";
      }
    }
  }

}

// Car class
class Car{
  constructor(x,y,lap,type,rotation,facelength,facewidth,backlength,backwidth, acceleration, maxspeed, braking, handling, thing, thing2, backText,topText, abilityTime, checkpoint, colourA, colourB, abilitycolour){
    if(rotation === 0){
      this.body = new Sprite(x*big-backlength/2,y*big);
      this.face = new Sprite(x*big+facelength/2,y*big);
    }
    else if(rotation === 90){
      this.body = new Sprite(x*big,y*big-backlength/2);
      this.face = new Sprite(x*big,y*big+facelength/2);
    }
    else if(rotation === 180){
      this.body = new Sprite(x*big+backlength/2,y*big);
      this.face = new Sprite(x*big-facelength/2,y*big);
    }
    else if(rotation === 270){
      this.body = new Sprite(x*big,y*big+backlength/2);
      this.face = new Sprite(x*big,y*big-facelength/2);
    }

    this.body.rotation = rotation;
    this.body.w = backlength;
    this.body.h = backwidth;

    this.body.color = colourA;
    
    everything.push(this.body);
    
    this.face.rotation = rotation;
    this.face.w = facelength;
    this.face.h = facewidth;

    this.face.color = colourB;
    
    everything.push(this.face);

    this.midsec = new GlueJoint(this.body,this.face);

    this.colourA = colourA;
    this.colourB = colourB;
    

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
    this.lapCounter.color = "green";
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

    this.abilityBar = new Bar(300,20,5,10+this.respawnBar.height+this.respawnBar.yOffset, abilitycolour, "Press Shift to " + backText, topText,abilityTime,0);
    this.timer = 0;
    this.time = abilityTime;

    this.speedometer = new Bar(270,35,5, 20+this.abilityBar.height+this.abilityBar.yOffset, "yellow", "W = Gas, ' '=Reverse", "",16,0);

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
            this.face.remove();
            this.body.remove();
            this.finished = true;
          }
        }
      }
    }
  }

  displayUI(){
    let mid = cheese.vehicle.carCenter();
    this.lapCounter.x = mid.x*big-windowWidth/2+(this.lapCounter.w/2+5);
    this.lapCounter.y = mid.y*big-windowHeight/2+(this.lapCounter.h/2+5);
    this.lapCounter.text = "Lap:" + this.lap + "/" + laps;

    this.abilityBar.update(this.timer);
    this.abilityBar.display(mid);

    this.respawnBar.update(this.respawnCommit);
    this.respawnBar.display(mid);

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
        if (this.speedometer.backText !== ""){
          this.speedometer.backText = "";
        }
      }
    }
    else{
      avspeed = "";
      this.speedometer.progress.color = "yellow";
    }
    this.speedometer.progress.text = avspeed;
    this.speedometer.display(mid);
  }

  drive() {
    if ( Math.abs(this.move) > 0){
      if(this.hanbrake === false||Math.abs(this.move) > 1.5){

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

    // gas
    if (keyIsDown(87)){
      this.move += this.acceleration/60;
    }
    // brake
    if (keyIsDown(32)){
      if (toZero(this.move) === 1){
        this.move -= toZero(this.move)*this.braking/100;
      }
      else{
        this.move -= this.acceleration/60;
      }

    }
    // special ability
    if (keyIsDown(16)){
      this.special();
    }

    this.body.bearing = this.body.rotation;
  
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
    if(keyIsDown(82) || this.dead){
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

// Makes the wall
class Wall{
  constructor(x,y,width,height,rotation){
    this.cement = new Sprite(x*big,y*big,width*big,height*big);
    this.cement.collider = "static";
    this.cement.rotation = rotation;
    this.cement.layer = 1;
    everything.push(this.cement);
  }
}

// Makes the spikes
class SpWall{
  constructor(x,y,amount,rotation,orientation){
    for (let i = 0; i <= amount; i++){
      let shift = i*10*big;
      let death;
      if(orientation === "vert"){
        death = new Spike(x,y+shift,rotation);
      }
      else{
        death = new Spike(x+shift,y,rotation);
      }
    }
  }
}

// Makes the glue joints
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

// Makes the glue joints
class Spike{
  constructor(x,y,rotation,puff){
    let thing = 20;
    let thang = 6;
    let mode,boing;
    if (puff){
      mode = "dynamic";
      boing = 5;
    }
    else{
      mode = "static";
      boing = 0;
    }
    this.metal = new Sprite(x*big,y*big, [
      [thing*big, thang*big],
      [-1*thing*big, thang*big],
      [0, -12*big]
    ],mode);
    this.metal.mass = 0;
    this.metal.drag = -1;
    this.metal.bounciness = boing;
    
    this.metal.rotation = rotation;
    this.metal.layer = 0.2;
    everything.push(this.metal);
    spikes.push(this.metal);
  }
}

// Makes the glue joints
function makecheckP(x,y,angle,list,size){
  let checker = new CheckP(x,y,angle,list.length,size);
  list.push(checker);
}

//Checks for the spikes if collided
class CheckP{
  constructor(x,y,angle,number,size){
    this.x = x;
    this.y = y;
    this.rotation = angle;
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
    this.spot.color = "grey";
    this.number = number;
  }
}

function makeSM(x,y,angle,list){
  list.push(new startMark(x,y,angle));
}

// Makes the start marks
class startMark{
  constructor(x,y,rotation){
    this.x = x ;
    this.y = y;
    let spacing = 15;
    if (rotation === 0){
      this.x = x-spacing;
    }
    else if(rotation === 90){
      this.y = y-spacing;
    }
    else if(rotation === 180){
      this.x = x+spacing;
    }
    else if(rotation === 270){
      this.y = y+spacing;
    }
    
    this.rotation = rotation;
    this.square = new Sprite(x*big,y*big,0,40);
    this.square.collider = "none";
    this.square.stroke = "white";
    this.square.layer = 0.2;
    
    this.square.rotation = rotation;
  }
}

// Makes the bar
class Bar{
  constructor(width,height,xOffset,yOffset,colour,backText,topText,inmax){
    this.back = new Sprite(0,0,width,height);
    this.back.collider = "none";
    this.back.color = "white";
    this.back.stroke = "black";
    this.back.layer = 4;
    this.backText = backText;
    this.progress = new Sprite(0,0,0,height);
    this.progress.collider = "none";
    this.progress.color = colour;
    this.progress.stroke = "black";
    this.progress.layer = 5;
    this.topText = topText;
    this.width = width;
    this.height = height;
    this.xOffset =xOffset;
    this.yOffset = yOffset;
    this.inmax = inmax;
  }
  display(spot){
    this.back.x = spot.x*big-windowWidth/2+(this.back.w/2+this.xOffset);
    this.back.y = spot.y*big-windowHeight/2+(this.back.h/2+this.yOffset);

    this.progress.x = spot.x*big-windowWidth/2+(this.progress.w/2+this.xOffset);
    this.progress.y = spot.y*big-windowHeight/2+(this.progress.h/2+this.yOffset);
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

// Rests counters
function toZero(number){
  if (number !== 0){
    return number/Math.abs(number);
  }
  return number;
  
}

// Makes the track
function makeTrack(id){
  if (id === "BnF"){
    let wall1,wall2,wall3,wall4;
    let barrier1,barrier2,barrier3,barrier4;
    let die1,die2,die3;

    big = 2.2;
    laps = 8;

    wall1 = new Wall(500,200,1500,20,0);
    wall2 = new Wall(500,500,1500,20,0);
    wall3 = new Wall(-250,350,20,300,0);
    wall4 = new Wall(1250,350,20,300,0);

    barrier1 = new Wall(500,260,15,100,0);
    barrier2 = new Wall(225,385,15,130,0);
    barrier3 = new Wall(150,240,15,200,65);
    barrier4 = new Wall(850,360,15,200,50);

    die1 = new SpWall(300,490,15,270,"hor");
    die2 = new SpWall(230,330,5,0,"vert");
    die3 = new SpWall(600,207,20,90,"hor");

    makeSM(1160, 320, 180,starts);
    makeSM(1140, 360, 180,starts);
    makeSM(1160, 400, 180,starts);

    makecheckP(1100,350, 180, checkpoints, 270);
    makecheckP(-120,350, 0,checkpoints, 270/2);


  }
  else if (id === "Int"){
    // map
    let divider1,divider2,divider3,divider4,eastwall1,westwall1,eastwall2,westwall2,eastwall3;
    let south1, south2, south3, south4, south5, south6;
    let dwall1,dwall2;

    dwall2 = new SpWall(805,500,14,90);
    divider1 = new Wall(570,500,900,15,0);
  

    dwall1 = new SpWall(185,95,59,90); 
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

    makeSM(730,330, 180, starts);
    makeSM(725,380, 180, starts);
    makeSM(720,430, 180, starts);

    // finish/start 
    makecheckP(700,380, 180, checkpoints, 215);

    makecheckP(110,270, 270, checkpoints,100);
    makecheckP(850, 180, 0, checkpoints, 65);
    makecheckP(990, 981, 180, checkpoints, 150);
  }
  
}