import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { Switch, Route, Redirect } from "react-router-dom";
import { routesPublic, routesPrivate } from "../routes";
import { PrivateRoute, PublicRoute } from "../components";
import { GetDataContext } from "../../Context";
import { getToken } from "../../utils/localStorage";
import { getProfileInfo } from "../../utils/getDataRequest/index";
import axios from "axios";

const MainNavigation = () => {
  const [profileInfo, setProfile] = useState({});
  const [sensorTimeslots, setSensorTimeslots] = useState([]);
  const [am7, setAm7] = useState({});
  const [am11, setAm11] = useState({});
  const [pm3, setPm3] = useState({});
  const [pm7, setPm7] = useState({});

  const token = getToken();

  useEffect(() => {
    token && getProfileInfo(setProfile);
  }, [token]);

  const sendChangeData = async (am7, am11, pm3, pm7) => {
    let dataArr = [am7, am11, pm3, pm7];
    let submitArr = [];

    dataArr.forEach((element, index) => {
      if (
        Object.keys(element).length !== 0 &&
        (element !== null || undefined)
      ) {
        submitArr.push(element);
      }
    });

    const response = await axios({
      method: "PUT",
      url: `${BASE_URL}/admin/editSensor`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        editArray: submitArr,
      },
    });

    if (response && response.editedSensors) {
      setAm7({});
      setAm11({});
      setPm3({});
      setPm7({});
    }
  };

  return (
    <GetDataContext.Provider
      value={{
        token,
        profileInfo,
        sensorTimeslots,
        setSensorTimeslots,
        am7,
        setAm7,
        am11,
        setAm11,
        pm3,
        setPm3,
        pm7,
        setPm7,
        sendChangeData,
      }}
    >
      <Switch>
        {token
          ? routesPrivate.map((route) => (
              <PrivateRoute
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          : routesPublic.map((route) => (
              <PublicRoute
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}

        <Route exact path="*">
          <Redirect to={token ? "/dashboard" : "/signIn"} />
        </Route>
      </Switch>
    </GetDataContext.Provider>
  );
};

export default MainNavigation;
