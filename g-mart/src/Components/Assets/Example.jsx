import Lottie from "lottie-react";
import Logo from "../Assets/Logo.json";
import React from "react";
// import Aaa from "../Assets/Aaa.json"

const Example = () => {
  const style = {
    height: 60,
    width: 60,
  };
  return <Lottie animationData={Logo} style={style} />;
};

export default Example;
