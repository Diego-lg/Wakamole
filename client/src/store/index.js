import { proxy } from "valtio";

const state = proxy({
  //functionamiento
  intro: true,
  color: "#0e7490",
  //logo
  isLogoTexture: true,
  //full polo
  isFullTexture: false,
  logoDecal: "./00015.png",
  fullDecal: "./00015.png",
});

export default state;
