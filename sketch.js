function setup() {
  createCanvas(400, 400);
  noStroke();
}

function mousePressed() {
  // write shared data
  shared.x = mouseX;
  shared.y = mouseY;
}

function draw() {
  background("#ffcccc");
  fill("#000066");

  // read shared data
  ellipse(shared.x, shared.y, 100, 100);
}