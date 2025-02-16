import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import UPhone from "./UPhone";
import { Suspense } from "react";
import PhoneLoader from "./PhoneLoader";

const ModelView = ({
  index, // Determines whether this is the small or large model
  groupRef, // Reference to the 3D model group
  gsapType, // Used for GSAP animations (view1 or view2)
  controlRef, // Reference for OrbitControls (camera interaction)
  setRotationState, // Function to update rotation state when model is rotated
  size, // Current model size (small or large)
  item, // Model details (color, image, etc.)
}) => {
  return (
    <View
      index={index}
      id={gsapType} // Assign GSAP animation type
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient light to provide basic illumination */}
      <ambientLight intensity={0.5} />

      {/* Perspective camera to view the model */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Additional lighting setup */}
      <Lights />

      {/* OrbitControls for model rotation and zooming */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={true} // Allow zooming
        enablePan={true} // Allow panning
        rotateSpeed={0.4} // Set rotation speed
        target={new THREE.Vector3(0, 0, 0)} // Focus camera on the model
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())} // Save rotation state
      />

      {/* 3D Model Group (small or large) */}
      <group
        ref={groupRef} // Store reference for animations
        name={index === 1 ? "small" : "large"} // Assign a name based on index
        position={[0, 0, 0]} // Center the model
      >
        {/* Load model with fallback loader while loading */}
        <Suspense fallback={<PhoneLoader />}>
          <UPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} // Adjust scale based on size
            item={item} // Pass model details
            size={size} // Pass selected size
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
