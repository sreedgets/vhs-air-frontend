import React, { useState, useEffect, useContext } from "react";
//libraries
import classNames from "classnames";
//components
import AsideMenu from "../../components/AsideMenu";
import AddAdminForm from "../../components/AddAdminForm";
import Admins from "../../components/Admins";
import Modal from "../../components/Modal";
import GreetingBlock from "../../components/GreetingBlock";
//constants
import { greeting, adminMenuTitle } from "../../constants";
//context
import { GetDataContext } from "../../Context";
//utils
import { getAdmins } from "../../utils/getDataRequest";
import { removeToken } from "../../utils/localStorage";
//toast massage
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//style
import "./styles.scss";

const Settings = () => {
  //context
  const { profileInfo } = useContext(GetDataContext);

  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);

  const [checkPage, setCheckPage] = useState("Create Admin");

  //modal
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  const logout = () => {
    removeToken();
    window.location.pathname = "/singIn";
  };

  //toast
  const admitWasAddedMessage = (message) => toast(`${message}`);

  useEffect(() => {
    getAdmins(setAdmins, page);
  }, [page]);

  return (
    <div className="settings">
      <ToastContainer />
      <div className="settings__asideMenu">
        <AsideMenu
          profileInfo={profileInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        action={logout}
        actionBtnFirstTitle={"Cancel"}
        actionBtnSecondTitle={"Log Out"}
        title={"Are you sure you want to log out?"}
      />
      <div className="settings__content">
        <div>
          <GreetingBlock
            profileInfo={profileInfo}
            title={greeting.adminGreeting}
          />
        </div>
        <div className="settings__table">
          <div className="settings__table__menu">
            {adminMenuTitle.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames("settings__table__button", {
                    active: checkPage === item,
                  })}
                  onClick={() => {
                    setCheckPage(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div>
            {checkPage === "Create Admin" ? (
              <AddAdminForm
                setAdmins={setAdmins}
                admitWasAddedMessage={admitWasAddedMessage}
              />
            ) : (
              <Admins
                admins={admins}
                setAdmins={setAdmins}
                setPage={setPage}
                page={page}
                admitWasAddedMessage={admitWasAddedMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
