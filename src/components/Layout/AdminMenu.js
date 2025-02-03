import React from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
const AdminMenu = () => {
  return (
    <div className="">
      {/* ************************************************************************* */}
      <div>
        <a
          className=""
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
        >
          <IoMenu className="text-black ml-3 mt-3 text-3xl" />
        </a>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <h3 className="font-bold text-2xl">Admin Panel</h3>
            <div className="grid mt-3 col-span-1 gap-y-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                    : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
                }
                to="/dashboard/admin/create-category"
              >
                Category
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                    : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
                }
                to="/dashboard/admin/create-product"
              >
                Product
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                    : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
                }
                to="/dashboard/admin/allProduct"
              >
                All Product
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                    : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
                }
                to="/dashboard/admin/orders"
              >
                Orders
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                    : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
                }
                to="/dashboard/admin/users"
              >
                User
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* ******************************************************************************** */}
      {/* <h3 className="font-bold text-2xl">Admin Panel</h3>
      <div className="grid mt-3 col-span-1 gap-y-2">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
              : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
          }
          to="/dashboard/admin/create-category"
        >
          Category
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
              : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
          }
          to="/dashboard/admin/create-product"
        >
          Product
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
              : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
          }
          to="/dashboard/admin/allProduct"
        >
          All Product
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
              : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
          }
          to="/dashboard/admin/orders"
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
              : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
          }
          to="/dashboard/admin/users"
        >
          User
        </NavLink>
      </div> */}
    </div>
  );
};

export default AdminMenu;
