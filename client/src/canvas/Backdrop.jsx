import React, { useRef } from "react";

import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    //shadow wall
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={[1, 1, 1]}
      rotation={[3 / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[-5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={1.25}
        ambient={0.55}
        position={[-5, 5, 3]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
