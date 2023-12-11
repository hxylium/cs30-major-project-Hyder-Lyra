/* eslint-disable no-undef */
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(50);
  ellipse(pos.x, pos.y, 100, 100);
}

function mousePressed() {
  pos.x = mouseX;
  pos.y = mouseY;
}

function connected_f1(){
  console.log("Connection Established!");
}