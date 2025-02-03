import React, { useEffect, useReducer } from "react";
import Layout from "../../Layout/Layout";
import UserMenu from "../../Layout/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const initialValue = {
    name: "",
    email: "",
    address: "",
    phNumber: "",
    password: "",
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

      default:
        break;
    }
  };

  const [profile, dispatcher] = useReducer(reducer, initialValue);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name: profile.name,
          email: profile.email,
          password: profile.password,
          phone: profile.phNumber,
          address: profile.address,
        }
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Update Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    dispatcher({ type: "get_name", value: name });
    dispatcher({ type: "get_email", value: email });
    dispatcher({ type: "get_address", value: address });
    dispatcher({ type: "get_phnumber", value: phone });
  }, [auth?.user]);

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <UserMenu />
          </div>
          <div className="col-span-7">
            <div className="flex h-full justify-center items-center">
              <div className="w-full max-w-xs  me-5">
                <form
                  className="bg-white shadow-md rounded px-8 pt-4 pb-6 mb-2"
                  onSubmit={updateProfile}
                >
                  <h1 className="my-3 text-2xl text-center font-bold">
                    User Profile{" "}
                  </h1>
                  <div className="mb-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      value={profile.name}
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
                      value={profile.email}
                      onChange={(e) => {
                        dispatcher({
                          type: "get_email",
                          value: e.target.value,
                        });
                      }}
                      placeholder="Enter Email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      value={profile.address}
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
                      value={profile.phNumber}
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
                      value={profile.password}
                      onChange={(e) => {
                        dispatcher({
                          type: "get_password",
                          value: e.target.value,
                        });
                      }}
                      placeholder="******************"
                    />
                  </div>

                  <div className="flex items-center justify-start">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      // onClick={registerSub}
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                  ©2024 Acme Corp. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
