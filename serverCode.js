/* eslint-disable no-undef */
let pos = {};

function preload() {
  // connect to a p5party server
  partyConnect(
    "wss://demoserver.p5party.org",
    "Testing_F1",
    // `${random(0, 100)}`
    "Room1",
    connected_f1()
  );
  
  // tell p5.party to sync the pos object
  pos = partyLoadShared("pos", pos);
}
