import React from "react";
//libraries
import { useFormik } from "formik";
import * as Yup from "yup";
//api
import { axiosRequest } from "../../API/axiosRequest";
//utils
import { setToken } from "../../utils/localStorage";
//style
import "./styles.scss";

const SignInSchema = Yup.object().shape({
  login: Yup.string().required().min(6, "Login should be bigger then 6 chars"),
  password: Yup.string()
    .required()
    .min(6, "Password should be bigger then 6 chars"),
});

const SignInForm = ({ wrongPassword }) => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      const resp = await axiosRequest(
        "admin/weblogin",
        {
          login: values.login,
          password: values.password,
        },
        "POST"
      );
      if (resp?.loginOwnSuccess) {
        setToken(resp.accessToken);
        window.location.pathname = "/dashboard";
      }
      if (resp.error) {
        wrongPassword(resp.message);
        formik.resetForm();
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="input__wrapper">
        <label htmlFor="login" className="form__label">
          Login
        </label>
        <input
          id="login"
          name="login"
          type="login"
          placeholder="Enter login"
          onChange={formik.handleChange}
          value={formik.values.login}
          className="form__input"
        />
        <div className="form__error">{formik.errors.login}</div>
      </div>
      <div className="input__wrapper">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="form__input"
        />
        <div className="form__error">{formik.errors.password}</div>
      </div>
      <div>
        <input
          type="submit"
          value="LOGIN"
          className="form__button"
          disabled={!formik.dirty}
        />
      </div>
    </form>
  );
};

export default SignInForm;
