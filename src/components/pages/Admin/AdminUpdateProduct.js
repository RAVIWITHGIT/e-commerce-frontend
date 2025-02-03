import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import { Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const AdminUpdateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const myParams = useParams();

  // get single Product
  const singleProduct = async () => {
    const { data } = await axios(
      `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/get-product/${myParams.slug}`
    );
    setName(data.OneProduct.name);
    setDescription(data.OneProduct.description);
    setPrice(data.OneProduct.price);
    setQuantity(data.OneProduct.quantity);
    setCategory(data.OneProduct.category._id);
    setId(data.OneProduct._id);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/category/get_category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/update_product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("product update successfully");
        navigate("/dashboard/admin/allProduct");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    singleProduct();
  }, []);

  // ********* delete Product
  const deleteProduct = async () => {
    try {
      let answer = window.prompt(
        "Are you sure want to delete this product ? Yes/No :"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/deleteProduct/${id}`
      );
      toast.success("Product Delete SuccessFully");
      navigate("/dashboard/admin/allProduct");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard- create Product"}>
      <div className="min-h-screen">
        <div className="grid min-h-screen grid-cols-4">
          <div className="border-e-8  bg-[#858080] border-[black] px-2">
            <AdminMenu />
          </div>
          <div className="col-span-3">
            <h2 className="pl-2 text-3xl font-serif font-bold">
              Update Product
            </h2>
            <Select
              className="w-[75%] pl-2 "
              showSearch
              size="large"
              placeholder="Select a category"
              optionFilterProp="label"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => {
                return (
                  <Option key={c._id} value={c._id} label={c.name}>
                    {c.name}
                  </Option>
                );
              })}
            </Select>
            <div className="ml-2 mt-2 py-1 text-center hover:text-white hover:bg-gray-600 w-[74%] bg-gray-500 rounded">
              <label>
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  hidden
                />
              </label>
            </div>
            <div className="w-[75%] mt-2">
              {photo ? (
                <div className="">
                  <img
                    className="m-auto w-[20%]"
                    src={URL.createObjectURL(photo)}
                    alt="productPhotos"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                  />
                </div>
              ) : (
                <div className="">
                  <img
                    className="m-auto w-[20%]"
                    src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${id}`}
                    alt="productPhoto"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
            <div className=" ml-2  my-2 ">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-[75%] py-2 border-2 border-gray-600 pl-2 rounded "
                placeholder="write a name"
              />
            </div>
            <div className=" ml-2   ">
              <textarea
                value={description}
                rows={"4"}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                cols={"50"}
                className="w-[75%] py-2 border-2 border-gray-600 pl-2 rounded "
                placeholder="write Description"
              ></textarea>
            </div>
            <div className=" ml-2  my-2 ">
              <input
                value={price}
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="w-[75%] py-2 border-2 border-gray-600 pl-2 rounded "
                placeholder="write a price"
              />
            </div>
            <div className=" ml-2   ">
              <input
                value={quantity}
                type="number"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                className="w-[75%] py-2 border-2 border-gray-600 pl-2 rounded "
                placeholder="write a quantity"
              />
            </div>
            <div className=" ml-2  my-2">
              <Select
                className="w-[75%]  "
                showSearch
                size="large"
                placeholder="Select Shipping"
                optionFilterProp="label"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0" label="No">
                  No
                </Option>
                <Option value="1" label="Yes">
                  Yes
                </Option>
              </Select>
            </div>
            <div className="ml-2 my-2">
              <button
                className="bg-gray-600 py-2 px-2 text-white hover:text-black rounded"
                onClick={(e) => {
                  handleUpdate(e);
                }}
              >
                update Product
              </button>
            </div>
            <div className="ml-2 my-2">
              <button
                className="bg-red-800 py-2 px-2 text-white hover:text-black rounded"
                onClick={() => {
                  deleteProduct();
                }}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUpdateProduct;
