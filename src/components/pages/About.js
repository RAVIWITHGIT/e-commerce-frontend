import React from "react";
import Layout from "../Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Page"}>
      <div class="max-auto border h-[100%] grid lg:grid-cols-2 gap-2">
        <div className="col-span-1 flex items-center justify-center   ">
          <img
            className="w-[70%] md:w-[60%] lg:w-[100%]"
            src="./images/About.avif"
            alt=""
          />
        </div>
        <div className="col-span-1   flex flex-col justify-center ">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
            About Section
          </h1>
          <p className="text-[13px] sm:text-[11px] md:text-xs  lg:text-base ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            sequi vel quaerat qui tempore repellendus odio magni impedit cum
            perspiciatis non ad facere architecto deserunt itaque nihil minima,
            magnam tenetur? Accusantium libero placeat voluptas in nostrum,
            cupiditate praesentium culpa saepe commodi architecto, animi
            voluptatum quas rerum ad ab. Quam, amet.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
