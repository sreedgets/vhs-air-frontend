import React from "react";
//libraries
import { useFormik } from "formik";
import * as Yup from "yup";
//api
import { axiosRequest } from "../../API/axiosRequest";
//styles
import "./styles.scss";

const addAdminSchema = Yup.object().shape({
  login: Yup.string().min(6).required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().min(6).required(),
});

const AddAdminForm = ({ setAdmins, admitWasAddedMessage }) => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: addAdminSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        const response = await axiosRequest(
          "admin/createUser",
          {
            login: values.login,
            password: values.password,
          },
          "POST"
        );
        admitWasAddedMessage(response.message);
        if (response && response.created) {
          const res = await axiosRequest(
            `admin/users?page=1&size=3`,
            null,
            "GET"
          );
          setAdmins(res.users);
          formik.resetForm();
        }
      } else {
        admitWasAddedMessage("Password don`t same");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="addAdminForm">
      <div className="addAdminForm__input__wrapper">
        <label htmlFor="login" className="addAdminForm__label">
          Login
        </label>
        <input
          id="login"
          name="login"
          type="login"
          placeholder="Enter login"
          onChange={formik.handleChange}
          value={formik.values.login}
          className="addAdminForm__input"
        />
        <div className="addAdminForm__error">{formik.errors.login}</div>
      </div>
      <div className="addAdminForm__input__wrapper">
        <label htmlFor="password" className="addAdminForm__label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="addAdminForm__input"
        />
        <div className="addAdminForm__error">{formik.errors.password}</div>
      </div>
      <div className="addAdminForm__input__wrapper">
        <label htmlFor="password" className="addAdminForm__label">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="addAdminForm__input"
        />
        <div className="addAdminForm__error">
          {formik.errors.confirmPassword}
        </div>
      </div>
      <div>
        <input
          type="submit"
          value="Create Profile"
          className="addAdminForm__button"
          disabled={!formik.dirty}
        />
      </div>
    </form>
  );
};

export default AddAdminForm;
