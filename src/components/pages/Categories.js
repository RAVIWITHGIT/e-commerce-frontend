import React from "react";
import Layout from "../Layout/Layout";
import useCategory from "../hooks/useCategory";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="max-w-[1200px] m-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((c) => {
            return (
              <div className="border-2 border-pink-600 my-3 flex justify-center">
                <NavLink
                  className={"flex justify-center flex-col"}
                  to={`/category/${c.slug}`}
                >
                  <img
                    className="w-[90%] m-auto mt-2 h-[200px] "
                    src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/category/category-photo/${c._id}`}
                    alt={c.name}
                  />
                  <Button className="my-3 mx-3 bg-slate-500 text-white">
                    {c.name}
                  </Button>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
