import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/auth/AllOrders"
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders - ecommerce  App"}>
      <div className="min-h-screen ">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <AdminMenu />
          </div>
          <div className="col-span-7">
            <h2 className="text-center font-serif text-3xl">All Orders</h2>
            <div className="relative overflow-x-auto container mx-auto">
              <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      #
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Buyer
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Payment
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            {orders?.map((orderDetails, index) => {
              console.log(orderDetails);
              return (
                <div className="relative overflow-x-auto container mx-auto">
                  <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4">{index + 1}</td>
                        <td class="px-6 py-4">
                          <Select
                            bordered={false}
                            onChange={(value) => {
                              handleChange(orderDetails._id, value);
                            }}
                            defaultValue={orderDetails?.status}
                          >
                            {status.map((s, i) => {
                              return (
                                <Select.Option key={i} value={s}>
                                  {s}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </td>
                        <td class="px-6 py-4">{orderDetails?.buyer?.name}</td>
                        <td class="px-6 py-4">
                          {moment(orderDetails?.createAt).fromNow()}
                        </td>
                        <td class="px-6 py-4">
                          {orderDetails?.payment?.success
                            ? "Success"
                            : "failed"}
                        </td>
                        <td class="px-6 py-4">
                          {orderDetails?.products?.length}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {orderDetails.products?.map((value) => {
                    return (
                      <div className="grid grid-cols-5 border-2 my-2">
                        <div className="col-span-2 ">
                          <img
                            // className="w-[90%] m-auto mt-2 h-[200px] "
                            className=" m-auto mt-2  size-48"
                            src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${value._id}`}
                            alt={value.name}
                          />
                        </div>
                        <div className="col-span-3  flex flex-col justify-center">
                          <h2>{value.name}</h2>
                          <p>{value.description.substring(0, 30)}</p>
                          <p>Price :{value.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
