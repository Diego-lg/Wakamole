import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Analytics } from "@vercel/analytics/react";

import state from "../store";
import { CustomButton } from "../components/";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      <Analytics />
      {snap.intro && (
        <motion.section className="home flex flex-col items-center justify-center">
          <motion.header className="mb-4" {...slideAnimation("down")}>
            <img
              src="./00002.png"
              alt="logo"
              className="logo w-12 h-12 object-contain transform scale-150"
            />
          </motion.header>
          <motion.header
            className="flex justify-end pr-6 absolute top-8 right-0 gap-2 "
            {...slideAnimation("down")}
          >
            <CustomButton
              type="filled"
              title="Store"
              handleClick={() => (state.intro = true)}
              customStyles="font-bold text-sm"
            />
            <CustomButton
              type="filled"
              title="Contact Us"
              handleClick={() => (state.intro = true)}
              customStyles="font-bold text-sm"
            />
          </motion.header>
          <motion.div
            className="home-content text-center"
            {...headContainerAnimation}
          >
            <motion.div {...headTextAnimation}>
              <h1 className="head-Text text-3xl font-bold text-white">
                Unleash <br className="xl:hidden" /> Your Style.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-white text-base xl:text-xl">
                <strong>
                  Your Style, Your Way: Step into the future of fashion, where
                  you shape the trends and AI fuels your creativity.
                </strong>
              </p>

              <CustomButton
                type="filled"
                title="Design"
                handleClick={() => (state.intro = false)}
                customStyles="font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
