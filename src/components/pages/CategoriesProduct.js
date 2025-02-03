import React, { useEffect, useState } from "react";
import Layout from "./../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoriesProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="max-w-[1200px] m-auto">
        <h2 className="text-center">Category - {category[0]?.name}</h2>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="grid grid-cols-2  px-2  md:grid-cols-3 max-w-4xl gap-3 m-auto my-3">
          {products.map((value) => {
            return (
              <div className="rounded bg-gray-500">
                <img
                  className="w-[90%] m-auto mt-2 h-[200px] "
                  src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${value._id}`}
                  alt={value?.name}
                />
                <h3 className="font-bold text-xl pl-3">{value?.name}</h3>
                <p className="pl-3">₹{value?.price}</p>
                <p className="pl-3">{value?.description.substring(0, 30)}...</p>
                <div className="flex justify-evenly mb-3 text-white">
                  <button
                    className="border-2 py-1 px-3 border-gray-600 hover:bg-gray-700"
                    onClick={() => {
                      navigate(`/product/${value?.slug}`);
                    }}
                  >
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

export default CategoriesProduct;
