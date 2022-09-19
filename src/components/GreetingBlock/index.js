import React from "react";
import Loader from "react-loader-spinner";
//styles
import "./styles.scss";

const GreetingBlock = ({ profileInfo, title, isLoading }) => {
  return (
    <div className="greetingBlock">
      {isLoading ? (
        <Loader type="ThreeDots" color="#4f7a9f" height={40} width={40} />
      ) : (
        <div className="greetingBlock__subtitle">
          Hi, {profileInfo && profileInfo?.login}
        </div>
      )}
      <div className="greetingBlock__title">{title}</div>
    </div>
  );
};

export default GreetingBlock;
