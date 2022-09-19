import React from "react";
//Images
import { logo } from "../../assets/images";
import SignInForm from "../../components/SIgnInForm";
//toast message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Style
import "./styles.scss";

const SignIn = () => {
  const wrongPassword = (message) => toast(`${message}`);
  return (
    <div className="signIn">
      <div className="signIn__form">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="signIn__title">Login to your account</div>
        <div className="signIn__form__wrapper">
          <SignInForm wrongPassword={wrongPassword} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
