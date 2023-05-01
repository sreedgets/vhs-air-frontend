import React, { useState, useContext, useEffect } from "react";
//components
import EditDataButton from "../EditDataButton";
//icon
import { arrow } from "../../assets/icons/index";
//context
import { GetDataContext } from "../../Context";
//styles
import "./styles.scss";

const TableCardRow = ({
  item,
  sensorId,
  element,
  index,
  date,
  cardIsOpen,
  setCardIsOpen,
  dataEdit,
  setDataEdit,
  dataWasChanged,
}) => {
  //context
  const { setSensorTimeslots, setAm7, setAm11, setPm3, setPm7 } =
    useContext(GetDataContext);

  //input state
  const [aqi, setAqi] = useState();
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();

  const dateSecond = new Date(element.date);

  //timeslot object template
  const timeslotItem = {
    idData: element._id,
    idSensor: sensorId,
    aqi: +aqi,
    humidity: +humidity,
    temperature: +temperature,
  };

  useEffect(() => {
    if (aqi && humidity && temperature) {
      switch (dateSecond.getHours()) {
        case 3:
          setAm7(timeslotItem);
          break;
        case 7:
          setAm11(timeslotItem);
          break;
        case 12:
          setPm3(timeslotItem);
          break;
        case 17:
          setPm7(timeslotItem);
          break;
      }
    }
  }, [aqi, humidity, temperature]);
/*   useEffect(() => {
    if (aqi && humidity && temperature) {
      switch (dateSecond.getHours()) {
        case 7:
          setAm7(timeslotItem);
          break;
        case 11:
          setAm11(timeslotItem);
          break;
        case 15:
          setPm3(timeslotItem);
          break;
        case 19:
          setPm7(timeslotItem);
          break;
      }
    }
  }, [aqi, humidity, temperature]); */

  const cardDate = new Date(date);

  const parseTime = date => {
    const splitString = date.split(" ");
    const getHour = splitString[1].split(":", 1);
    const readTime = getHour + " " + splitString[2];

    return readTime;
  } 

  const timeslotDate = parseTime(element.date);

  return (
    <tbody className={index === 0 ? "tableRow__thead" : "tableRow__tbody"}>
      <tr className="tableRow__wrapper">
        <th className="tableRow__column">
          {index === 0 && (
            <div className="tableRow__text">
              {cardDate.toDateString().slice(3)}
            </div>
          )}
          {index === 1 && (
            <EditDataButton
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
              item={item}
              dataWasChanged={dataWasChanged}
            />
          )}
        </th>
        <th className="tableRow__column tableRow__text">
          {timeslotDate}
        </th>
        <th className="tableRow__column">
          <input
            className="tableRow__input"
            maxLength="4"
            placeholder={
              element.description !== "Data didn't come"
                ? Math.round(element.aqi)
                : "-"
            }
            name="aqi"
            value={aqi}
            onChange={(e) => {
              if (
                e.target.value >= 0 &&
                e.target.value <= 1000 &&
                e.target.value.length <= 4
              ) {
                setAqi(e.target.value);
              }
            }}
            type="number"
            disabled={(!element.canEdit && !element.edited) || !dataEdit}
          />
        </th>
        <th className="tableRow__column">
          <input
            className="tableRow__input"
            placeholder={
              element.description !== "Data didn't come"
                ? Math.round(element.humidity)
                : "-"
            }
            name="humidity"
            value={humidity}
            onChange={(e) => {
              if (e.target.value >= -126 && e.target.value <= 136) {
                setHumidity(e.target.value);
              }
            }}
            type="number"
            disabled={(!element.canEdit && !element.edited) || !dataEdit}
          />
        </th>
        {index === 0 ? (
          <th className="tableRow__column arrowJustify">
            <input
              className="tableRow__input"
              placeholder={
                element.description !== "Data didn't come"
                  ? Math.round(element.temperature)
                  : "-"
              }
              name="temperature"
              value={temperature}
              onChange={(e) => {
                if (
                  e.target.value >= 0 &&
                  e.target.value <= 100 &&
                  e.target.value.length <= 3
                ) {
                  setTemperature(e.target.value);
                }
              }}
              type="number"
              disabled={
                (!element.canEdit &&
                  element.description !== "Data didn't come" &&
                  !element.edited) ||
                !dataEdit
              }
            />
            <img
              src={arrow}
              alt="arrow"
              className={`arrowIcon ${cardIsOpen && "arrowIcon__open"}`}
              onClick={() => {
                setCardIsOpen((prev) => !prev);
                setSensorTimeslots(item?.data);
              }}
            />
          </th>
        ) : (
          <input
            className="tableRow__input"
            placeholder={
              element.description !== "Data didn't come"
                ? Math.round(element.temperature)
                : "-"
            }
            name="temperature"
            value={temperature}
            onChange={(e) => {
              if (
                e.target.value >= 0 &&
                e.target.value <= 100 &&
                e.target.value.length <= 3
              ) {
                setTemperature(e.target.value);
              }
            }}
            type="number"
            disabled={(!element.canEdit && !element.edited) || !dataEdit}
          />
        )}
      </tr>
    </tbody>
  );
};

export default TableCardRow;
