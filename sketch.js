/* eslint-disable no-undef */
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

  display(x, y, colour){
    noStroke();
    fill(colour);
    // text(this.name, this.x, this.y);
    circle(x, y, 69);
  }

  update(){
    pos.x = this.x;
    pos.y = this.y;
  }
}

let p1;

function setup() {
  createCanvas(400, 400);
  p1 = new Player("lolsies", random(width), random(height), "white");
  pos = {
    x: p1.x,
    y: p1.y,
    colour: p1.color
  };
}


function draw() {
  background(50);
  p1.display(pos.x, pos.y, pos.colour);
  p1.move();
  p1.update();
}

function connected_f1(){
  console.log("Connection Established!");
}