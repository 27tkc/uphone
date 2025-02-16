import { Html } from "@react-three/drei";
import React from "react";
import Loader from "react-js-loader";

const PhoneLoader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">
          <Loader
            type="bubble-ping"
            bgColor={"black"}
            color={"white"}
            size={50}
          />
        </div>
      </div>
    </Html>
  );
};

export default PhoneLoader;
