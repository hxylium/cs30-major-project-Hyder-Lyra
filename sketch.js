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

  update(){
    pos.x = this.x;
    pos.y = this.y;
    console.log(this.name, pos.x, pos.y);
  }
}

let p1, smth;

function setup() {
  createCanvas(400, 400);
  p1 = new Player("lolsies", random(width), random(height), "white");
}


function draw() {
  background(50);
  p1.move();
  smth = frameRate();
  if (smth/2 === 30){
    console.log("smj");
    p1.update();
  }
  display();
}

function connected_f1(){
  console.log("Connection Established!");
}

function display(){
  noStroke();
  fill("white");
  circle(p1.x, p1.y, 69);
}