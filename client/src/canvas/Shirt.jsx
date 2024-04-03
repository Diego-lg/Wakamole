import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";

import { Decal, useGLTF, useTexture, OrbitControls } from "@react-three/drei";
import state from "../store";
import { TextureLoader, Vector2 } from "three";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  // Load normal map textures
  const loader = new TextureLoader();

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={0.4}
        material-opacity={1}
        material-transparent={false}
        material-alphaTest={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.7}
            map={fullTexture}
            depthTest={true}
            depthWrite={true}
            polygonOffset
            polygonOffsetFactor={-1}
            blendMode={0}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={[0.15, 0.15, 0.15]}
            map={logoTexture}
            depthTest={true}
            depthWrite={false}
          />
        )}
        //
      </mesh>
    </group>
  );
};
<OrbitControls />; //para controlar la camara con el mouse
export default Shirt;
