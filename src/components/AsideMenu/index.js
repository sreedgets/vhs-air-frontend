import React, { useRef } from "react";
//libraries
import { NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";
//image
import { logo } from "../../assets/images";
//svg
import { DataIcon, SettingsIcon } from "../../assets/svg";
//hooks
import { useOutsideClick } from "../../hooks/useOutsideClick";
//styles
import "./styles.scss";

const AsideMenu = ({ profileInfo, isOpen, setIsOpen, isLoading }) => {
  const logOutRef = useRef();

  const closeModal = () => setIsOpen(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  useOutsideClick(logOutRef, closeModal);

  return (
    <div className="asideMenu">
      <div>
        <div className="asideMenu__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="asideMenu__buttons">
          <div className="text">Admin tools</div>
          <ul>
            <li className="btn">
              <NavLink to="/dashboard">
                <div className="btn__content">
                  <div className="icon">
                    <DataIcon />
                  </div>
                  <div className="btnText">Data</div>
                </div>
              </NavLink>
            </li>
            {profileInfo?.ruleAdmin && (
              <li className="btn">
                <NavLink to="/settings">
                  <div className="btn__content">
                    <div className="icon">
                      <SettingsIcon />
                    </div>
                    <div className="btnText">Admins</div>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="asideMenu__info">
        {isLoading ? (
          <Loader type="ThreeDots" color="#4f7a9f" height={30} width={30} />
        ) : (
          <div className="emailText">{profileInfo && profileInfo?.login}</div>
        )}
        <div className="text">
          {profileInfo?.ruleAdmin ? "Super Admin" : "Admin"}
        </div>
        <div className="logOut__btn" ref={logOutRef} onClick={toggleModal}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default AsideMenu;
