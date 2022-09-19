import React from "react";
//libraries
import classNames from "classnames";
//styles
import "./styles.scss";

const Modal = ({
  isOpen,
  toggleModal,
  action,
  actionBtnFirstTitle,
  actionBtnSecondTitle,
  title,
}) => {
  return (
    <div
      className={classNames("modal", { active: isOpen })}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="modal__text">{title}</div>
        <div className="modal__btnWrapper">
          <div className="modal__cancel" onClick={toggleModal}>
            {actionBtnFirstTitle}
          </div>
          <div className="modal__confirm" onClick={action}>
            {actionBtnSecondTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
