import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Form/CategoryForm";
import { Button, Modal } from "antd";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [getImg, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      categoryData.append("photo", getImg);
      const { data } = await axios.post(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/category/create-category",
        categoryData
      );
      if (data?.success) {
        toast.success(`${data.message}`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
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

  // update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", updateName);
      categoryData.append("photo", getImg);
      const { data } = await axios.put(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/category//update-category/${selected}`,
        categoryData
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  // delete Category
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/category/deleteCategory/${categoryId}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Dashboard- create Category"}>
      <div className="min-h-screen">
        <div className="grid min-h-screen grid-cols-8">
          <div className="">
            <AdminMenu />
          </div>
          <div className="col-span-7 px-1">
            <h2 className="font-bold py-3 text-2xl pl-5">Manage Category</h2>
            <CategoryForm
              buttonText="Add"
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              myImg={getImg}
              setMyImg={setImg}
            />
            <table className="table-auto w-full sm:w-[75%]   mt-2">
              <thead>
                <tr className="border-b-2  border-gray-400  ">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {categories?.map((value, index) => {
                  return (
                    <tr className="border-b-2  border-gray-400 " key={index}>
                      <td className="py-2">{value.name}</td>
                      <td className="py-2">
                        <button
                          onClick={() => {
                            setOpen(true);
                            setSelected(value._id);
                            setUpdatedName(value.name);
                          }}
                          className=" py-0.5 px-2.5 bg-blue-400 rounded hover:bg-blue-500 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          className=" py-0.5 ml-2 px-2.5 bg-red-400 rounded hover:bg-red-500 hover:text-white"
                          onClick={() => {
                            handleDelete(value._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Modal
            // title="Title"
            open={open}
            onOk={() => {
              setOpen(false);
            }}
            footer={null}
            // confirmLoading={confirmLoading}
            onCancel={() => {
              setOpen(false);
            }}
          >
            <CategoryForm
              buttonText="Edit"
              value={updateName}
              setValue={setUpdatedName}
              myImg={getImg}
              setMyImg={setImg}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCategory;
