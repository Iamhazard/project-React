import Lottie from "lottie-react";
import Animation from "../Assets/Animation.json";
import React from "react";

const Motorbike = () => {
  const style = {
    height: 300,
  };

  return <Lottie animationData={Animation} style={style} />;
};

export default Motorbike;
