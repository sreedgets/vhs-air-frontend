import React, { useState, useEffect, useContext } from "react";
//libraries
import moment from "moment";
import { isInclusivelyBeforeDay } from "react-dates";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import classNames from "classnames";
import Loader from "react-loader-spinner";
//Components
import AsideMenu from "../../components/AsideMenu";
import GreetingBlock from "../../components/GreetingBlock";
import Modal from "../../components/Modal";
import TableCard from "../../components/TableCard";
//Constants
import { greeting, tableTitles } from "../../constants";
//API
import { axiosRequest } from "../../API/axiosRequest";
//Image
import { calendar, download } from "../../assets/icons/index";
//Context
import { GetDataContext } from "../../Context";
//utils
import { removeToken } from "../../utils/localStorage";
//toast massage
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Styles
import "./styles.scss";

const Dashboard = () => {
  //context
  const { profileInfo, token } = useContext(GetDataContext);
  //loader
  const [isLoading, setIsLoading] = useState(true);
  //calendar
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();

  //modal
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  //logout
  const logout = () => {
    removeToken();
    window.location.pathname = "/singIn";
  };

  const dataWasChanged = (message) => toast(message);

  //get sensor
  const [sensors, setSensors] = useState([]);
  const [sensorPage, setSensorPage] = useState(1);
  const [sensor, setSensor] = useState();
  const [sensorData, setSensorData] = useState();

  //download xlsx file
  const downloadFile = (file) => {
    const uri = URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = uri;
    link.download = uri.split("/").pop() + ".xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //get sensor data default
  const getSensors = async (sensorPage) => {
    const response = await axiosRequest(
      `admin/getSensors?page=${sensorPage}&size=5`,
      {
        from: null,
        to: null,
      },
      "POST"
    );
    if (response && response?.successGet) {
      setSensors(response?.sensors);
      setIsLoading((prev) => !prev);
    }
  };

  //get sensor data range in calendar
  const getRangeData = async (startDate, endDate) => {
    const startDateConst = new Date(startDate?._d?.setHours(0, 0, 0, 0));
    const endDateConst = new Date(endDate?._d?.setHours(23, 59, 59, 0));

    const response = await axiosRequest(
      `admin/getSensors?page=1&size=50`,
      {
        from: startDateConst.toLocaleString('en-US', {timeZone: 'America/Chicago'}),
        to: endDateConst.toLocaleString('en-US', {timeZone: 'America/Chicago'})
      },
      "POST"
    );
    if (response && response?.successGet) {
      setSensors(response?.sensors);
    }
  };

  //get .xlsx api
  const getReport = async () => {
    const startDateConst = new Date(startDate?._d?.setHours(0, 0, 0, 0));
    const endDateConst = new Date(endDate?._d?.setHours(23, 59, 59, 0));
    if (startDate && endDate) {
      const response = await axiosRequest(
        "admin/report",
        {
            from: startDateConst.toLocaleString('en-US', {timeZone: 'America/Chicago'}),
            to: endDateConst.toLocaleString('en-US', {timeZone: 'America/Chicago'})
        },
        "POST",
        null,
        true
      );
      response && downloadFile(response);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getRangeData(startDate, endDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    getSensors(sensorPage);
  }, [token]);

  useEffect(() => {
    setSensor(sensors && sensors[0]);
  }, [sensors]);

  useEffect(() => {
    setSensorData(sensor?.dataSensor);
  }, [sensor]);

  //pagination load more
  const loadMore = async () => {
    const response = await axiosRequest(
      `admin/getSensors?page=${sensorPage + 1}&size=5`,
      {
        from: null,
        to: null,
      },
      "POST"
    );
    if (response && response?.successGet) {
      setSensorPage(+response?.page);
      for (let i = 0; i < response?.sensors?.length; i++) {
        if (response?.sensors[i]?.name === sensor?.name) {
          setSensorData(sensorData.concat(response.sensors[i].dataSensor));
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <ToastContainer />
      <div className="dashboard__asideMenu">
        <AsideMenu
          profileInfo={profileInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
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
      <div className="dashboard__content">
        <div className="dashboard__header">
          <GreetingBlock
            profileInfo={profileInfo}
            title={greeting?.dashboardGreeting}
            isLoading={isLoading}
          />
          <div
            className={!showCalendar ? "calendar__hidden" : "calendar__visible"}
          >
            <DateRangePicker
              startDate={startDate}
              startDateId="start-date"
              endDate={endDate}
              endDateId="end-date"
              onDatesChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
              focusedInput={focusedInput}
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
              isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
            />
          </div>
        </div>
        <div className="dashboard__submenu">
          {isLoading ? (
            <div className="dashboardTable__spinerLocation">
              <Loader type="ThreeDots" color="#4f7a9f" height={50} width={50} />
            </div>
          ) : (
            <div className="location__buttons">
              {sensors?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={classNames("location__button", {
                      active: sensor?.name === item?.name,
                    })}
                    onClick={() => {
                      setSensor(item);
                      setSensorPage(1);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          )}
          <div className="support__buttons">
            <div
              className="support__buttons__calendar"
              onClick={() => {
                setShowCalendar(!showCalendar);
              }}
            >
              <img src={calendar} alt="calendar" />
            </div>
            <div className="support__buttons__download" onClick={getReport}>
              <img src={download} alt="download" />
            </div>
          </div>
        </div>
        <div className="dashboardTable">
          <div className="dashboardTable__titles">
            {tableTitles?.map((title, index) => {
              return (
                <div key={index} className="dashboardTable__title">
                  {title}
                </div>
              );
            })}
          </div>
          {isLoading ? (
            <div className="dashboardTable__spiner">
              <Loader
                type="ThreeDots"
                color="#4f7a9f"
                height={100}
                width={100}
              />
            </div>
          ) : (
            sensorData?.map((item, index) => {
              return (
                <TableCard
                  key={index}
                  item={item}
                  sensor={sensor}
                  dataWasChanged={dataWasChanged}
                />
              );
            })
          )}

          <div className="dashboardTable__buttonWrapper">
            <div className="dashboardTable__button" onClick={loadMore}>
              Load More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
