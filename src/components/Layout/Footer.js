import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-4 md:p-4 lg:p-8 text-center bg-black">
      <h1 className="text-white md:text-lg font-new-amsterdam-regular font-bold">
        All Right Reserved &copy; Pooja Pvt. Ltd.
      </h1>
      <div>
        <Link to="/about" className="pe-1 text-white">
          About |
        </Link>
        <Link to="/contact" className=" text-white">
          Contact
        </Link>
        <Link to="/policy" className="ps-1 text-white">
          | Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
