import React from "react";
import toast from "react-hot-toast";

const CategoryForm = ({
  buttonText,
  handleSubmit,
  value,
  setValue,
  myImg,
  setMyImg,
}) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          if (value.length != 0) {
            handleSubmit(e);
          } else {
            e.preventDefault();
            toast.error(`you can  not ${buttonText}  empty Category`);
          }
        }}
      >
        <input
          className="border-2 border-black rounded pl-1"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Enter Category"
        />
        <label>
          {myImg ? myImg.name : "Upload Photo"}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => {
              setMyImg(e.target.files[0]);
            }}
            hidden
          />
        </label>
        <div className="w-[75%] mt-2">
          {myImg && (
            <div className="">
              <img
                className="m-auto w-[20%]"
                src={URL.createObjectURL(myImg)}
                alt="productPhoto"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className=" ml-1 py-0.5 px-2.5 bg-blue-400 rounded hover:bg-blue-500 hover:text-white"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
