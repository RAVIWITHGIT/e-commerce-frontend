import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import axios from "axios";

const User = () => {
  const [getUserDetails, setUserDetails] = useState([]);
  const getAllProducts = async () => {
    const { data } = await axios(
      "https://ecomerce-backend-nuwo.onrender.com/api/v1/auth/getAllUser"
    );
    setUserDetails(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard-All users"}>
      <div className="min-h-screen">
        <div className="grid min-h-screen grid-cols-8">
          <div className=" ">
            <AdminMenu />
          </div>
          <div className="col-span-7">
            <h2 className=" my-3">User Details</h2>
            <div className="grid grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 max-w-4xl gap-3 m-auto">
              {getUserDetails.map((value) => {
                return (
                  <div className="rounded bg-gray-500">
                    <h3 className="font-bold text-xl pl-1">
                      <span> Name: </span> {value.name}
                    </h3>
                    <p className="pl-1">
                      {" "}
                      <span className="font-semibold"> Email:</span>{" "}
                      {value.email}
                    </p>
                    <p className="pl-1">
                      <span className="font-semibold"> Address: </span>{" "}
                      {value.address}
                    </p>
                    <p className="pl-1">
                      <span className="font-semibold"> Ph.No: </span>
                      {value.phone}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
