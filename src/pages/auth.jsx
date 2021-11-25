import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import instance from "services";
import * as AppURL from "services/urlAPI";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  username: Yup.string().required("Username is required!")
});

const SignupSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  username: Yup.string().required("Username is required"),
  phone: Yup.string().required("Phone is required!"),
  mail: Yup.string().required("Mail is required!"),
  discriminator: Yup.string().required("Discriminator is required")
});

const AuthPage = () => {
  const [registering, setRegistering] = useState(false);
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const fromUrl = _get(location, "state.from.pathname");

  const notifyError = () => toast.error("Failed");

  const goToForgotPassword = (e) => {
    e.preventDefault();
  };

  const goToRegister = (e) => {
    e.preventDefault();
    setRegistering(true);
  };

  const goToLogin = (e) => {
    e.preventDefault();
    setRegistering(false);
  };

  const signInSuccess = (userData) => {
    console.log(userData);
    if (registering) {
      instance
        .post(AppURL.register, userData)
        .then((res) => {
          signIn(authDispatch, userData);
          if (fromUrl) {
            history.push(fromUrl);
          } else {
            history.push("/");
          }
        })
        .catch((err) => {
          notifyError();
        });
    } else {
      let param = {
        username: userData.username,
        password: userData.password
      };
      instance
        .post(AppURL.login, param)
        .then((res) => {
          if (res.status === 200) {
            signIn(authDispatch, userData);
            if (fromUrl) {
              history.push(fromUrl);
            } else {
              history.push("/");
            }
          } else {
            console.log("jj");
            notifyError();
          }
        })
        .catch((err) => {
          notifyError();
        });
    }
  };

  return (
    <>
      <ToastContainer />
      {registering === true ? (
        <Formik
          initialValues={{
            username: "",
            password: "",
            phone: "",
            mail: "",
            discriminator: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const userData = { ...values };
              resetForm();
              signInSuccess(userData);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {() => (
            <Form>
              <Field
                name="username"
                type="text"
                placeholder="Mobile Number or Email Address"
                component={Input}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                component={Input}
              />
              <Field
                name="phone"
                type="text"
                placeholder="Phone number"
                component={Input}
              />
              <Field
                name="mail"
                type="text"
                placeholder="Email"
                component={Input}
              />
              <Field
                name="discriminator"
                type="text"
                placeholder="Discriminator"
                component={Input}
              />

              <button className="auth-button block" onClick={() => {}}>
                Sign Up
              </button>

              <p>
                Already have account?{" "}
                <a href="/#" onClick={goToLogin}>
                  Sign In Now!
                </a>
              </p>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const userData = { ...values };
              resetForm();
              signInSuccess(userData);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {() => (
            <Form>
              <Field
                name="username"
                type="text"
                placeholder="Mobile Number or Email Address"
                component={Input}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                component={Input}
              />

              <p>
                <a href="/#" onClick={goToForgotPassword}>
                  Forgot Password?
                </a>
              </p>
              <button className="auth-button block" onClick={() => {}}>
                Login
              </button>

              <p>
                New here?{" "}
                <a href="/#" onClick={goToRegister}>
                  Sign Up Now!
                </a>
              </p>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AuthPage;
