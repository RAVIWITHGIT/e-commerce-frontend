import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // totalPrice
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // deleting item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => {
        return item._id === pid;
      });
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `https://ecomerce-backend-nuwo.onrender.com/api/v1/product/braintree/token`
      );
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "https://ecomerce-backend-nuwo.onrender.com/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );

      await setLoading(false);
      await localStorage.removeItem("cart");
      await setCart([]);
      await navigate("/dashboard/user/orders");
      toast.success("Payment Comppleted Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1200px] m-auto">
        <div className="grid">
          <div className="col  text-center">
            <h2>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
            <h3>
              {cart?.length >= 1
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3">
            {cart?.map((value) => {
              return (
                <div className="grid grid-cols-5 border-2 my-2">
                  <div className="col-span-2 ">
                    <img
                      // className="w-[90%] m-auto mt-2 h-[200px] "
                      className=" m-auto mt-2  size-48"
                      src={`https://ecomerce-backend-nuwo.onrender.com/api/v1/product/product-photo/${value._id}`}
                      alt={value.name}
                    />
                  </div>
                  <div className="col-span-3  flex flex-col justify-center">
                    <h2>{value.name}</h2>
                    <p>{value.description.substring(0, 30)}</p>
                    <p>Price :{value.price}</p>
                    <div>
                      <button
                        className="bg-slate-600 px-3 py-1 text-white"
                        onClick={() => {
                          removeCartItem(value._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-span-2 text-center flex flex-col justify-center h-dvh">
            <h2 className="font-bold text-2xl ">Cart Summary</h2>
            <p className="font-semibold text-lg">Total | Checkout | Payment</p>
            <hr className="border-2 mb-2" />
            <h4 className="font-semibold text-lg">Total :{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="bg-slate-500 px-2 py-2 text-white rounded"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    update Address
                  </button>
                </div>
              </>
            ) : (
              <div>
                {auth?.token ? (
                  <button
                    className="bg-slate-500 px-2 py-2 text-white rounded"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    update Address
                  </button>
                ) : (
                  <button
                    className="bg-purple-500 px-2 py-2 text-white rounded"
                    onClick={() => {
                      navigate("/login", { state: "/cart" });
                    }}
                  >
                    Pleas login to checkout
                  </button>
                )}
              </div>
            )}
            <div>
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
