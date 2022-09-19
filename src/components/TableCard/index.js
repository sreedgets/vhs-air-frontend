import React, { useState } from "react";
//libraries
import classNames from "classnames";
//components
import TableCardRow from "../TableCardRow";
//style
import "./styles.scss";

const TableCard = ({ item, sensor, dataWasChanged }) => {
  const [cardIsOpen, setCardIsOpen] = useState(null);
  const [dataEdit, setDataEdit] = useState(false);
  return (
    <table
      className={classNames("tablecard", {
        active: cardIsOpen,
      })}
    >
      {item?.data?.map((element, index) => {
        return (
          <TableCardRow
            element={element}
            index={index}
            date={item?.DATE}
            key={index}
            item={item}
            cardIsOpen={cardIsOpen}
            setCardIsOpen={setCardIsOpen}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
            sensorId={sensor?.id}
            dataWasChanged={dataWasChanged}
          />
        );
      })}
    </table>
  );
};

export default TableCard;
