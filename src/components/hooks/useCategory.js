import axios from "axios";
import React, { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  //   **** get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/category/get_category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;
