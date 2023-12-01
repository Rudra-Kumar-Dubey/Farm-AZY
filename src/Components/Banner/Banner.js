import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Cars">Rice</option>
              <option value="Cameras & Lenses">Wheat</option>
              <option value="Computers & Laptops">Fruits</option>
              <option value="Mobile Phones">Vegetables</option>
              <option value="Motorcycles">Oil seeds</option>
              <option value="Tablets">Nuts and Dry fruits</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={() => setCategory("Rice")} >Rice</span>
            <span onClick={() => setCategory("Wheat")} >Wheat</span>
            <span onClick={() => setCategory("Fruits")} >Fruits</span>
            <span onClick={() => setCategory("Vegetables")} >Vegetables</span>
            <span onClick={() => setCategory("Oil seeds")} >Oil seeds</span>
            <span onClick={() => setCategory("Nuts and Dry fruits")} >Nuts and Dry fruits</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/FarmerAni.jpg" alt="" />
        </div>
      </div>
      {category != null && <DynamicPosts category={category} />}
    </div>
  );
}

export default Banner;
