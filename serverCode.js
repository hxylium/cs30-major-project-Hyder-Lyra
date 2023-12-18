/* eslint-disable no-undef */
let pos;

window.preload = () => {
  partyConnect(
    "wss://demoserver.p5party.org", 
    "drift-testing");
  pos = partyLoadShared("pos");
};
