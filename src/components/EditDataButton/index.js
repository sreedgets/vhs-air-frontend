import React, { useState, useContext } from "react";
//libraries
import classNames from "classnames";
//context
import { GetDataContext } from "../../Context";
//styles
import "./styles.scss";

const EditDataButton = ({ dataEdit, setDataEdit, item, dataWasChanged }) => {
  //context
  const { sendChangeData, am7, am11, pm3, pm7 } = useContext(GetDataContext);
  //modal
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);
  return (
    <button
      className="editDataButton"
      onClick={() => {
        if (dataEdit) {
          toggleModal();
        } else {
          setDataEdit((prev) => !prev);
        }
      }}
      disabled={item?.data?.every((element) => {
        if (!element.canEdit && !element.edited) {
          return true;
        }
      })}
    >
      {!dataEdit ? (
        <div>Edit</div>
      ) : (
        <div>
          Save
          <div
            className={classNames("editDataButton__confirmModal", {
              active: isOpen,
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="editDataButton__confirmModal__text">
                Are you really want to save changes?
              </div>
              <div className="editDataButton__confirmModal__btnWrapper">
                <div
                  className="editDataButton__confirmModal__cancel"
                  onClick={() => {
                    setDataEdit(!dataEdit);
                    toggleModal();
                  }}
                >
                  CANCEL
                </div>
                <div
                  className="editDataButton__confirmModal__confirm"
                  onClick={() => {
                    dataWasChanged("Data was changed");
                    sendChangeData(am7, am11, pm3, pm7);
                    setDataEdit(!dataEdit);
                    toggleModal();
                  }}
                >
                  CONFIRM
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default EditDataButton;
