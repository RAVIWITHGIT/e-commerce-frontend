import React from "react";
import Layout from "../../Layout/Layout";
import UserMenu from "../../Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      {/* <h1>Admin Dashboard Page</h1> */}
      <div className="min-h-screen ">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <UserMenu />
          </div>
          <div className="col-span-7">
            <h3>User Name : {auth?.user?.name}</h3>
            <h3>User Email : {auth?.user?.email}</h3>
            <h3>User Contact : {auth?.user?.address}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
