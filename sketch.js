/* eslint-disable no-undef */
let me;
let guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "cursors");
  me = partyLoadMyShared({ x: 200, y: 200 });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function mouseMoved(e) {
  me.x = mouseX;
  me.y = mouseY;
}

function draw() {
  background("#ffcccc");

  // draw each guests cursor
  for (const p of guests) {
    fill("#cc0000");
    circle(p.x, p.y, 69);
  }

  // mark this guests cursor
  fill("#ffffff");
  circle(me.x, me.y, 69);
}