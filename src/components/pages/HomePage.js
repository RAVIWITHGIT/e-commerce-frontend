import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const [Categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const nagigate = useNavigate();
  const [cart, setCart] = useCart();

  //getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://ecomerce-backend-nuwo.onrender.com//api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // ****************** get All Product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  //*************** get All Category
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

  //* ***************
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...Products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((v) => {
        return v != id;
      });
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/product/productFilter",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategory();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Product - Best Offers"}>
      <div className="grid grid-cols-1">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://cdn.pixabay.com/photo/2022/05/21/05/16/promotion-7210696_1280.png"
                className="d-block w-100 h-96"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.freepik.com/free-vector/delivery-logo-template_23-2147880262.jpg?ga=GA1.1.1223863802.1737094212&semt=ais_hybrid"
                className="d-block w-100 h-96"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2019/09/19/10/15/black-friday-4488821_1280.jpg"
                className="d-block w-100 h-96"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="max-w-[1250px] mx-auto ">
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 pt-2 gap-2">
          <div className="col-span-1 ">
            <h2 className="my-3 pl-5 text-xl font-serif">Filter By Category</h2>
            <div className="flex flex-col">
              {Categories?.map((c) => {
                return (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => {
                      handleFilter(e.target.checked, c._id);
                    }}
                  >
                    {c.name}
                  </Checkbox>
                );
              })}
            </div>
            <h2 className="my-3 pl-5 text-xl font-serif">Filter By Price</h2>
            <div className="flex flex-col">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Prices.map((p) => {
                  return (
                    <div>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  );
                })}
              </Radio.Group>
            </div>
            <button
              className="my-3 ml-4 py-1 px-3 bg-gray-600 text-white border-2 border-gray-600"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset filter
            </button>
          </div>
          <div className="sm:col-span-2 lg:col-span-3 ">
            {/* {JSON.stringify(radio, null, 4)} */}
            <h2 className="my-3 pl-5 text-3xl font-serif">All Product</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3  max-w-4xl gap-3 m-auto mb-4">
              {Products.map((value) => {
                return (
                  <div className="rounded bg-gray-500">
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
                          nagigate(`/product/${value.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button
                        className="border-2 border-gray-600 py-1 px-3 hover:bg-gray-700"
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
            <div className=" flex justify-center">
              {Products.length != 0
                ? Products &&
                  Products.length < total && (
                    // {Products.length==0?}

                    <button
                      className="bg-gray-600 text-white py-2 px-3 my-1 rounded hover:bg-gray-800"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading..." : "LoadMore"}
                    </button>
                  )
                : ""}
            </div>
            {/* vasu@ */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
