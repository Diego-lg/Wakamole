import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";

const AIpicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  const enhancerValue = ", lora:xl_more_art-full-beta2:1>";
  const luigiSerafini = ",serafini style, <lora:Serafini_Style_XL_V1:0.7>";
  const vectorArt = ",dfunk, <lora:DFunk_SDXL:1>";
  const legoStyle = ",(voxel syle), <lora:VoxelXL_v1:1>";
  const Horror = ",ab0m, <lora:ab0m:1>";
  const SciFi = ",science fiction style, <lora:SDXL Science Fiction :1>";
  /* 
  //Toggle function
  const [isEnhancerToggled, setIsEnhancerToggled] = useState(false);
  const [isLuigiToggled, setIsLuigiToggled] = useState(false);
  const [isvectorArtToggled, setIsvectorArtToggled] = useState(false);
  const [islegoStyleToggled, setIslegoStyleToggled] = useState(false);
  const [isHorrorToggled, setIsHorrorToggled] = useState(false);
  const [isSciFiToggled, setIsSciFiToggled] = useState(false);

  //Enhancer
  const handleStyle1LuigiClick = () => {
    if (prompt.includes(luigiSerafini)) {
      setPrompt(prompt.replace(luigiSerafini, ""));
    } else {
      setPrompt(prompt + luigiSerafini);
    }

    setIsLuigiToggled(!isLuigiToggled);
  };
  //luigi
  const handleStyle1EnhancerClick = () => {
    if (prompt.includes(enhancerValue)) {
      setPrompt(prompt.replace(enhancerValue, ""));
    } else {
      setPrompt(prompt + enhancerValue);
    }

    setIsEnhancerToggled(!isEnhancerToggled);
  };
  //Vector
  const handleStyle1vectorArtClick = () => {
    if (prompt.includes(vectorArt)) {
      setPrompt(prompt.replace(vectorArt, ""));
    } else {
      setPrompt(prompt + vectorArt);
    }

    setIsvectorArtToggled(!isvectorArtToggled);
  };
  //lego
  const handleStyle1legoStyleClick = () => {
    if (prompt.includes(legoStyle)) {
      setPrompt(prompt.replace(legoStyle, ""));
    } else {
      setPrompt(prompt + legoStyle);
    }

    setIslegoStyleToggled(!islegoStyleToggled);
  };
  //Horror
  const handleStyle1HorrorClick = () => {
    if (prompt.includes(Horror)) {
      setPrompt(prompt.replace(Horror, ""));
    } else {
      setPrompt(prompt + Horror);
    }

    setIsHorrorToggled(!isHorrorToggled);
  };
  //Sci-FI
  const handleStyle1SciFiClick = () => {
    if (prompt.includes(SciFi)) {
      setPrompt(prompt.replace(SciFi, ""));
    } else {
      setPrompt(prompt + SciFi);
    }

    setIsSciFiToggled(!isSciFiToggled);
  };
*/
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Enter your prompt:"
        rows={10}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3 w-200 h-20">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Generating..."
            customStyles="text - xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
            <CustomButton
              type="outline"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
            {/* 
            //Toggler Enchancer
            <CustomButton
              type={isEnhancerToggled ? "filled" : "outline"} // Toggle button type
              title="Enhancer"
              handleClick={handleStyle1EnhancerClick}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm ${
                isEnhancerToggled ? "text-gray-600" : "bg-blue-500 text-white"
              }`}
            />
            // Toggler Luigi
            <CustomButton
              type={isLuigiToggled ? "filled" : "outline"} // Toggle button type
              title="Luigi Serafini"
              handleClick={handleStyle1LuigiClick}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm ${
                isLuigiToggled ? "text-gray-600" : "bg-blue-500 text-white"
              }`}
            />
            // Toggler Vector
            <CustomButton
              type={isvectorArtToggled ? "filled" : "outline"} // Toggle button type
              title="Artistic Vector"
              handleClick={handleStyle1vectorArtClick}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm ${
                isvectorArtToggled ? "text-gray-600" : "bg-blue-500 text-white"
              }`}
            />
            // Toggler Lego 
            <CustomButton
              type={islegoStyleToggled ? "filled" : "outline"} // Toggle button type
              title="Lego"
              handleClick={handleStyle1legoStyleClick}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm ${
                islegoStyleToggled ? "text-gray-600" : "bg-blue-500 text-white"
              }`}
            />
            // Toggler Horror
            <CustomButton
              type={isHorrorToggled ? "filled" : "outline"} // Toggle button type
              title="Horror"
              handleClick={handleStyle1HorrorClick}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm ${
                isHorrorToggled ? "text-gray-600" : "bg-blue-500 text-white"
              }`}
            />
            //Toggler SciFi
            <CustomButton
              type={isSciFiToggled ? "filled" : "outline"} // Toggle button type
              title="Sci-Fi"
              handleClick={handleStyle1SciFiClick}
              customStyles={`w-fit px-4 py-2.5 font-bold text-sm ${
                isSciFiToggled ? "text-gray-600" : "bg-blue-500 text-white"
              }`}
            />
           */}
          </>
        )}
      </div>
    </div>
  );
};

export default AIpicker;
