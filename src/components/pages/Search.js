import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../Layout/Layout";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="max-w-[1260px] m-auto">
        <div className="text-center">
          <h2>Search Result</h2>
          <h6>{values?.results.length}</h6>
        </div>
        <div className="grid grid-cols-3 max-w-4xl gap-3 m-auto">
          {values?.results.map((value) => {
            return (
              <div className="rounded bg-gray-500">
                <img
                  className="w-[90%] m-auto mt-2 h-[200px]"
                  src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${value._id}`}
                  alt={value.name}
                />
                <h3 className="font-bold text-xl pl-3">{value.name}</h3>
                <p className="pl-3">₹{value.price}</p>
                <p className="pl-3">{value.description.substring(0, 30)}...</p>
                <div className="flex justify-evenly mb-3 text-white">
                  <button className="border-2 py-1 px-3 border-gray-600 hover:bg-gray-700">
                    More Details
                  </button>
                  <button className="border-2 border-gray-600 py-1 px-3 hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
