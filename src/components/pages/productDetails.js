import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [singleProduct, updateSingleProduct] = useState({});
  const [relatedProduct, updateRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      updateSingleProduct(data?.OneProduct);
      getRelatedProduct(data?.OneProduct._id, data?.OneProduct.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.slug) getSingleProduct();
  }, [params?.slug]);

  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      updateRelatedProduct(data?.relatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1230px] m-auto my-3 ">
        <div className="grid grid-cols-2">
          <div className=" border-purple-700">
            <img
              className=" border-2 border-purple-500"
              src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${singleProduct._id}`}
              alt=""
            />
          </div>
          <div>
            <h2 className="font-serif text-center text-2xl font-semibold mt-2 mb-3">
              Product Details
            </h2>
            <h3 className="pl-5">
              {" "}
              <span className="font-semibold">Name:</span> {singleProduct.name}
            </h3>
            <h3 className="pl-5">
              {" "}
              <span className="font-semibold">Description:</span>{" "}
              {singleProduct.description}
            </h3>
            <h3 className="pl-5">
              <span className="font-semibold">Price:</span>{" "}
              {singleProduct.price}
            </h3>
            <h3 className="pl-5">
              <span className="font-semibold">Category:</span>{" "}
              {singleProduct.category?.name}
            </h3>
            <h3 className="pl-5 ">
              <span className="font-semibold">Quantity:</span>{" "}
              {singleProduct.quantity}2
            </h3>
            <button
              className="ml-5 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => {
                setCart([...cart, singleProduct]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, singleProduct])
                );
                toast.success("Tem Added to cart");
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-serif my-3 text-xl">Similar Product</h3>
          {relatedProduct.length < 1 && <p>No Similar Product</p>}
          <div className="grid grid-cols-4  gap-5 m-auto">
            {relatedProduct.map((value, index) => {
              return (
                <div className="rounded bg-gray-500" key={index}>
                  <img
                    className="w-[90%] m-auto mt-2 h-[200px] "
                    src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${value._id}`}
                    alt={value.name}
                  />
                  <h3 className="font-bold text-xl pl-3">{value.name}</h3>
                  <p className="pl-3">₹{value.price}</p>
                  <p className="pl-3">
                    {value.description.substring(0, 30)}...
                  </p>
                  <div className="flex justify-evenly mb-3 text-white">
                    <button
                      className="border-2 py-1 px-3 border-gray-600 hover:bg-gray-700"
                      onClick={() => {
                        navigate(`/product/${value.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="border-2 border-gray-600 py-1 px-3 hover:bg-gray-700 "
                      onClick={() => {
                        setCart([...cart, value]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, value])
                        );
                        toast.success("Tem Added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
