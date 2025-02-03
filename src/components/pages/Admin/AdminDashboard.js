import React from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - ecommerce  App"}>
      {/* <h1>Admin Dashboard Page</h1> */}
      <div className="min-h-screen ">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <AdminMenu />
          </div>
          <div className="col-span-7 pt-2">
            <h3>Admin Name {auth?.user?.name}</h3>
            <h3>Admin Email {auth?.user?.email}</h3>
            <h3>Admin Contact {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
