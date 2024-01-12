let shared, my, guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "drifting_game");
  shared = partyLoadShared("shared", { players: []});
  my = partyLoadMyShared();
  guests = partyLoadGuestShareds();
}

// function setup() {
//   createCanvas(500, 400);
//   my.ball = { x: 0, y: 0, r: 20, colour: color(random(255), random(255), random(255)) };
// }

// function draw() {
//   moveBall();
//   drawScene();
// }

// function moveBall() {
//   if (keyIsDown(87)) {
//     my.ball.y -= 5;
//   }

//   if (keyIsDown(83)) {
//     my.ball.y += 5;
//   }

//   if (keyIsDown(65)) {
//     my.ball.x -= 5;
//   }

//   if (keyIsDown(68)) {
//     my.ball.x += 5;
//   }
// }

// function keyPressed() {
//   if (key === " ") {
//     partyEmit("createBall", {x: random(width), y: random(height), r: 20,colour: color(random(255), random(255), random(255)) });
//   }

//   else {
//     return false;
//   }
// }

// function drawScene(){
//   background(0);
//   fill(my.ball.colour);
//   circle(my.ball.x, my.ball.y, my.ball.r * 2);
//   for (const guest of guests) {
//     fill(guest.ball.colour);
//     circle(guest.ball.x, guest.ball.y, guest.ball.r * 2);
//   }
// }

// function drawBall(ball) {
//   circle(ball.x, ball.y, ball.r * 2);
// }