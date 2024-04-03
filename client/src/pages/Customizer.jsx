import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
  Rembg,
} from "../components";
//IP PARA GENERAR PROXYURL
const proxyUrl = "https://rtx3090.loclx.io/generate"; // The proxy URL you're running
const apiUrl = "http://127.0.0.1:5000/generate"; // Your Flask API endpoint

const proxyUrl_rembg = "https://rtx3090.loclx.io/rembg"; // The proxy URL you're running
const apiUrl_rembg = "http://127.0.0.1:5000/rembg"; // Your Flask API endpoint

const inputElement = "";
const img = new Image();
const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");

  const [generatingImg, setGeneratingImg] = useState(false);
  const [generatingRembg, setGeneratingRembg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //show tab content depending on the active tab

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            inputElement={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      case "rembg":
        return <rembg file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);
      const payload = {
        input: prompt,
        confirmation: 0, // Set to 1 to confirm that renderAi function is being used
      };
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });
      const blob = await response.blob();
      handleDecals(type, URL.createObjectURL(blob));

      //call our backend to generate an ai image!
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  ////////////////////////////////////////////
  // remove background function
  const handleSubmit_rembg = async (type) => {
    if (!prompt) return alert("Please enter a photo");

    try {
      setRembgImg(true);
      const response = await fetch(proxyUrl_rembg, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_image: URL.createObjectURL(blob),
          model: "u2net",
          return_mask: false,
          alpha_matting: false,
          alpha_matting_foreground_threshold: 240,
          alpha_matting_background_threshold: 10,
          alpha_matting_erode_size: 10,
        }),
      });
      const blob = await response.blob();
      handleDecals(type, URL.createObjectURL(blob));
      //// rembg backgroound function
      //call our backend to generate a REMBG!
    } catch (error) {
      alert(error);
    } finally {
      setRembgImg(false);
      setActiveEditorTab("");
    }
  };
  //////////////////////////////////////////////
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    //after setting the state, activeFilter is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {" "}
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className=" absolute top-0 left-0 z-0"
            {...slideAnimation("left")}
          >
            {/* GENERADOR DE TABS VISUAL*/}
            <div className="grid grid-cols- grid-rows-2 gap-4  h-screen w-full bg-white shadow  items-center max-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
              <motion.div
                className="filtertabs-container"
                {...slideAnimation("up")}
              >
                {FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>{" "}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default Customizer;
