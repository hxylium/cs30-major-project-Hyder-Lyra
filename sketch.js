/* eslint-disable no-undef */

pos = {x: random(width),
       y: random(height)};
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
}

let p1;

function setup() {
  createCanvas(400, 400);
  p1 = new Player("lolsies", random(width), random(height), "white");
}


function draw() {
  background(50);
  p1.move();
  update();
  display();
}

function connected_f1(){
  console.log("Connection Established!");
}

function display(){
  noStroke();
  fill("white");
  // text(this.name, this.x, this.y);
  circle(pos.x, pos.y, 69);
}

function update(){
  pos.x = this.x;
  pos.y = this.y;
}