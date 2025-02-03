import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import { Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const AdminProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get Product
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

  // add product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/product/create_product",
        productData
      );
      if (data?.success) {
        toast.success("product Created successfully");
        navigate("/dashboard/admin/AllProduct");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard- create Product"}>
      <div className="min-h-screen">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <AdminMenu />
          </div>
          <div className="col-span-7">
            <h2 className="pl-2 text-3xl font-serif font-bold">
              Create Product
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
              {photo && (
                <div className="">
                  <img
                    className="m-auto w-[20%]"
                    src={URL.createObjectURL(photo)}
                    alt="productPhoto"
                  />
                </div>
              )}
            </div>
            <div className=" ml-2  my-2 ">
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-[75%] py-2 border-2 border-gray-600 pl-2 rounded "
                placeholder="write a name"
              />
            </div>
            <div className=" ml-2   ">
              <textarea
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
                  handleCreate(e);
                }}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProduct;
