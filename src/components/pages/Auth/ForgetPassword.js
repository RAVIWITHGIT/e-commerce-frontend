import React, { useReducer } from "react";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const ForgetPassword = () => {
  const mynav = useNavigate();
  const myLocation = useLocation();

  const initialvalue = {
    email: "",
    newPassword: "",
    answer: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "get_email":
        return { ...state, email: action.value };
      case "get_newpassword":
        return { ...state, newPassword: action.value };
      case "get_answer":
        return { ...state, answer: action.value };

      default:
        break;
    }
  };

  const [forgetData, dispatcher] = useReducer(reducer, initialvalue);

  const sublogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgetPassword`,
        {
          email: forgetData.email,
          newPassword: forgetData.newPassword,
          answer: forgetData.answer,
        }
      );
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        console.log(myLocation);
        mynav(myLocation.state || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Forgot_Password Ecommerc App"}>
      <div className="h-full flex justify-center items-center mt-3">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={sublogin}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                value={forgetData.email}
                onChange={(e) => {
                  dispatcher({
                    type: "get_email",
                    value: e.target.value,
                  });
                }}
                placeholder="xyz232@gmail.com"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={forgetData.newPassword}
                onChange={(e) => {
                  dispatcher({
                    type: "get_newpassword",
                    value: e.target.value,
                  });
                }}
                placeholder="123456789"
              />
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nickName"
              >
                Enter Your Nick Name
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="nickName"
                type="string"
                value={forgetData.answer}
                onChange={(e) => {
                  dispatcher({
                    type: "get_answer",
                    value: e.target.value,
                  });
                }}
                placeholder="123456789"
              />
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset Password
              </button>
              {/* <a
                onClick={() => {
                  mynav("/forget-password");
                }}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a> */}
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            ©2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
