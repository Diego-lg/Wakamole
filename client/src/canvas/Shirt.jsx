import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame, useLoader } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, OrbitControls } from "@react-three/drei";
import state from "../store";
import { TextureLoader, MeshStandardMaterial } from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  // Load normal map textures
  const textureLoader = new TextureLoader();

  //fabric textures
  function MyMeshComponent({ nodes, materials }) {
    const [
      ambientOcclusionMap,
      baseColorMap,
      heightMap,
      normalMap,
      roughnessMap,
    ] = useTexture([
      "src/assets/fabric_texture/fabric_167_ambientocclusion-4K.png",
      "src/assets/fabric_texture/fabric_167_basecolor-4K.png",
      "src/assets/fabric_texture/fabric_167_height-4K.png",
      "src/assets/fabric_texture/fabric_167_normal-4K.png",
      "src/assets/fabric_texture/fabric_167_roughness-4K.png",
    ]);

    const material = new MeshStandardMaterial({
      map: baseColorMap,
      aoMap: ambientOcclusionMap,
      displacementMap: heightMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      roughness: 0.4,
      opacity: 1,
      transparent: false,
      alphaTest: 1,
    });

    return (
      <group key={stateString}>
        <mesh
          geometry={nodes.T_Shirt_male.geometry}
          material={material}
          castShadow
        />
      </group>
    );
  }

  ////////////////////////////////////////////////////////////////
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  ///////////// faberic texture
  const [
    ambientOcclusionMap,
    baseColorMap,
    heightMap,
    normalMap,
    roughnessMap,
    denim,
  ] = useTexture([
    "src/assets/fabric_texture/fabric_167_ambientocclusion-4K.png",
    "src/assets/fabric_texture/fabric_167_basecolor-4K.png",
    "src/assets/fabric_texture/fabric_167_height-4K.png",
    "src/assets/fabric_texture/fabric_167_normal-4K.png",
    "src/assets/fabric_texture/fabric_167_roughness-4K.png",
    "src/assets/fabric_texture/denimfabric.jpg",
  ]);
  const stateString = JSON.stringify(snap);
  const material = new MeshStandardMaterial({
    map: baseColorMap,
    aoMap: ambientOcclusionMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    roughness: 0.4,

    transparent: false,
  });
  const material_2 = new MeshStandardMaterial({
    map: denim,

    transparent: false,
  });
  ///////////// faberic texture
  return (
    <>
      <OrbitControls />
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
              material={material}
              depthTest={true}
              depthWrite={true}
              material-opacity={1}
              material-roughness={0.4}
              polygonOffset
              polygonOffsetFactor={-1}
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
        </mesh>
      </group>
    </>
  );
};

export default Shirt;
