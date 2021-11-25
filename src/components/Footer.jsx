import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="footer-links">
        <a href="https://github.com/AwesomeDracula" target="_blank">
          Github
        </a>
        <span> / </span>
        <a href="mailto:viettrungvu0111@gmail.com" target="_blank">
          Need any help?
        </a>
        <span> / </span>
        <a href="https://www.facebook.com/trung.viet.33046/" target="_blank">
          Say Hi on Facebook
        </a>
      </p>
      <p>
        &copy; {currentYear} <strong>Shopping Store</strong> - Software
        Architecture
      </p>
    </footer>
  );
};

export default Footer;
