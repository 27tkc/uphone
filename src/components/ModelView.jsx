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
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      //Ambient Light
      <ambientLight intensity={0.5} />
      //Camera
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      //Lights
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={true}
        enablePan={true}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small':'large'`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<PhoneLoader />}>
          <UPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
