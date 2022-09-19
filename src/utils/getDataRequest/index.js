import { axiosRequest } from "../../API/axiosRequest";

export const getSensors = async (state, page) => {
  const response = await axiosRequest(
    `admin/getSensors?page=${page}&size=5`,
    null,
    "GET"
  );
  if (response && response?.successGet) {
    state(response?.sensors);
  }
};

export const getProfileInfo = async (state) => {
  const response = await axiosRequest("admin/profile", null, "GET");
  if (response && response?.profileGet) {
    state(response?.profile);
  }
};

export const getAdmins = async (state, page) => {
  const response = await axiosRequest(
    `admin/users?page=${page}&size=${3}`,
    null,
    "GET"
  );
  if (response && response?.success) {
    state(response?.users);
  }
};
