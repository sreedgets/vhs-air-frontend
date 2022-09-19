import React from "react";
//components
import AdminCard from "../AdminCard";
//styles
import "./styles.scss";

const Admins = ({ admins, setAdmins, page, setPage, admitWasAddedMessage }) => {
  return (
    <div className="admins">
      <div className="admins__title">Login</div>
      {admins &&
        admins?.map((item, index) => {
          return (
            <AdminCard
              key={index}
              admin={item}
              setAdmins={setAdmins}
              admitWasAddedMessage={admitWasAddedMessage}
            />
          );
        })}
      <div className="admins__paginationWrapper">
        <div
          className={"admins__paginationWrapper__btn"}
          onClick={() => {
            if (page > 1) {
              setPage(page && page - 1);
            }
          }}
        >
          Back
        </div>

        <div
          className={"admins__paginationWrapper__btn"}
          onClick={() => {
            if (admins && admins?.length < 3) {
              setPage(page && page);
            } else {
              setPage(page && page + 1);
            }
          }}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Admins;
