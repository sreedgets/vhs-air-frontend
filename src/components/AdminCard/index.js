import React, { useState, useRef, useContext } from "react";
import { BASE_URL } from "../../config";
//libraries
import axios from "axios";
//components
import Modal from "../Modal";
//hooks
import { useOutsideClick } from "../../hooks/useOutsideClick";
//context
import { GetDataContext } from "../../Context";
//api
import { axiosRequest } from "../../API/axiosRequest";
//styles
import "./styles.scss";

const AdminCard = ({ admin, setAdmins, admitWasAddedMessage }) => {
  const { token } = useContext(GetDataContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);
  const closeModal = () => setIsOpen(false);
  const deleteRef = useRef();
  useOutsideClick(deleteRef, closeModal);

  const deleteUser = async () => {
    const response = await axios({
      method: "DELETE",
      url: `${BASE_URL}/admin/removeUser/${admin?._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response) {
      admitWasAddedMessage("Admin deleted");
      const res = await axiosRequest(`admin/users?page=1&size=3`, null, "GET");
      setAdmins(res.users);
    }

    toggleModal();
  };

  return (
    <div className="adminCard">
      <div className="adminCard__email">{admin.login}</div>
      <div className="adminCard__button" ref={deleteRef} onClick={toggleModal}>
        Delete
      </div>
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        action={deleteUser}
        actionBtnFirstTitle="Cancel"
        actionBtnSecondTitle="Delete"
        title="Are you sure want to delete admin?"
      />
    </div>
  );
};

export default AdminCard;
