import { proxy } from "valtio";

const state = proxy({
  //functionamiento
  intro: true,
  color: "#005B63",
  //logo
  isLogoTexture: true,
  //full polo
  isFullTexture: false,
  logoDecal: "./00015.png",
  fullDecal: "./00015.png",
});

export default state;
