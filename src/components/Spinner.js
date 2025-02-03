import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "react-spinner-loader";

const Spinner = ({ path = "login" }) => {
  const [loader, setLoader] = useState(true);
  const [count, setcount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div className="flex flex-col justify-center align-middle h-[100vh]">
      <h1 className="text-center font-bold">
        redirecting to you in {count} second
      </h1>
      <Loader show={loader}></Loader>
    </div>
  );
};

export default Spinner;
