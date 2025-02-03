import React from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const UserMenu = () => {
  return (
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
          <h3 className="font-bold text-2xl">Dashboard</h3>
          <div className="grid mt-3 col-span-1 gap-y-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                  : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
              }
              to="/dashboard/user/profile"
            >
              {/* <div className=""> */}
              Profile
              {/* </div> */}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white p-2 text-xl font-semibold rounded-lg"
                  : "bg-red-400 hover:bg-red-700 p-2 text-xl font-semibold rounded-lg"
              }
              to="/dashboard/user/orders"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
