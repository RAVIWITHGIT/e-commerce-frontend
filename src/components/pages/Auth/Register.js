import React, { useReducer, useState } from "react";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const mynav = useNavigate();
  // const [answer,setanswer] = useState("")
  const initialValue = {
    name: "",
    email: "",
    address: "",
    phNumber: "",
    password: "",
    answer: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "get_name":
        return { ...state, name: action.value };
      case "get_email":
        return { ...state, email: action.value };
      case "get_address":
        return { ...state, address: action.value };
      case "get_phnumber":
        return { ...state, phNumber: action.value };
      case "get_password":
        return { ...state, password: action.value };
      case "get_answer":
        return { ...state, answer: action.value };

      default:
        break;
    }
  };

  const [RegisterData, dispatcher] = useReducer(reducer, initialValue);

  const registerSub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name: RegisterData.name,
          email: RegisterData.email,
          password: RegisterData.password,
          phone: RegisterData.address,
          address: RegisterData.phNumber,
          answer: RegisterData.answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        mynav("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="flex h-full justify-center items-center mt-3">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-4 pb-6 mb-2"
            onSubmit={registerSub}
          >
            <h1 className="my-3 text-2xl font-bold">Register </h1>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={RegisterData.name}
                onChange={(e) => {
                  dispatcher({
                    type: "get_name",
                    value: e.target.value,
                  });
                }}
                placeholder="Username"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                value={RegisterData.email}
                onChange={(e) => {
                  dispatcher({
                    type: "get_email",
                    value: e.target.value,
                  });
                }}
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={RegisterData.address}
                onChange={(e) => {
                  dispatcher({
                    type: "get_address",
                    value: e.target.value,
                  });
                }}
                placeholder="Enter Your Address"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="number"
                value={RegisterData.phNumber}
                onChange={(e) => {
                  dispatcher({
                    type: "get_phnumber",
                    value: e.target.value,
                  });
                }}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={RegisterData.password}
                onChange={(e) => {
                  dispatcher({
                    type: "get_password",
                    value: e.target.value,
                  });
                }}
                placeholder="******************"
              />
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={RegisterData.answer}
                onChange={(e) => {
                  dispatcher({
                    type: "get_answer",
                    value: e.target.value,
                  });
                }}
                placeholder="Enter Your Nick Name"
              />
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={registerSub}
              >
                Register
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Go To Login?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            ©2024 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
