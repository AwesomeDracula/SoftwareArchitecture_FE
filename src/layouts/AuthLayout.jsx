import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="wrapper">
        <div className="auth-brand">
          <Link to="/">
            <img
              className="logo"
              src="https://res.cloudinary.com/buituan/image/upload/v1626684744/logoPtit.png"
              alt="Shopping Brand Logo"
            />
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
