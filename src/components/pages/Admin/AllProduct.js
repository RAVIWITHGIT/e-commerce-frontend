import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await axios(
      "https://ecomerce-backend-nuwo.onrender.com/api/v1/product/get-product"
    );
    setProducts(data.products);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"All Product - ecommerce  App"}>
      <div className="min-h-screen ">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <AdminMenu />
          </div>
          <div className="col-span-7">
            <h2 className="text-center font-serif text-3xl">All Product</h2>
            <div className="grid grid-cols-2 px-2 lg:grid-cols-3 max-w-4xl gap-3 m-auto">
              {products.map((value) => {
                return (
                  <div className="rounded bg-gray-500">
                    <NavLink to={`/dashboard/admin/product/${value.slug}`}>
                      <img
                        className="w-[90%] m-auto mt-2 h-[200px] "
                        src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${value._id}`}
                        alt={value.name}
                      />
                      <h3 className="font-bold text-xl pl-1">{value.name}</h3>
                      <p className="pl-1">{value.description}</p>
                    </NavLink>
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

export default AllProduct;
