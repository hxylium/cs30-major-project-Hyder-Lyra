// Major Project, F1 Racing
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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

  display(){
    noStroke();
    fill(this.color);
    // text(this.name, this.x, this.y);
    circle(this.x, this.y, 69);
  }
}

let p1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p1 = new Player("lolsies", 100, 100, color(random(255), random(255), random(255)));
}

function draw() {
  background(220);
  p1.move();
  p1.display();  
}