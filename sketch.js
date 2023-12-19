

class Player{
  constructor(name, x, y, color){
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = 10;
  }

  move(){
    if (keyIsDown(87)){
      this.y -= this.speed;
    }
    if (keyIsDown(65)){
      this.x -= this.speed;
    }
    if (keyIsDown(83)){
      this.y += this.speed;
    }
    if (keyIsDown(68)){
      this.x += this.speed;
    }
  }

  update(){
    pos.x = this.x;
    pos.y = this.y;
    // console.log(pos.x, pos.y);
  }
}

let p1, smth;
// let t1;

window.setup = () => {
  createCanvas(400, 400);
  noStroke();

  if (partyIsHost()) {
    pos = [];
    p1 = new Player("lolsies", random(width), random(height), "white");
    pos.push(p1),

  }
}


function draw() {
  background(50);
  p1.move();
  p1.update();
  // smth = frameRate();
  // pos.x = this.x;
  // pos.y = this.y;
  // if (millis()-t1 === 100){
  //   console.log("smj");
  //   p1.update();
  // }
  // display();
  // if (millis()-t1 >= 112){
  //   t1 = millis();
  // }
}

function connected_f1(){
  console.log("Connection Established!");
}

function display(){
  noStroke();
  fill("white");
  circle(pos.x, pos.y, 69);
}

function mousePressed(){
  p1.update();
}