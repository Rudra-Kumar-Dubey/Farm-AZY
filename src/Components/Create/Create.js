import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState();
  let [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    let date = new Date().toDateString();
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              description,
              url,
              userId: user.uid,
              createdAt: date,
            })
            .then(() => {
              history.push("/");
            });
        });
      });
  };
  return (
    <Fragment>
      <Header />
      {loading && <GoLoading />}
      <div className="createContainer">
        <div className="centerDiv">
          <div className="form">
            <h2>Enter Product Details</h2>
            <div className="txt">
              <input
                type="text"
                required
                name="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <span></span>
              <label>Name</label>
            </div>
            <div className="txt">
              <select
                name="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="input"
              >
                {" "}
                <option>Select Category</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Oil Seeds">Oil Seeds</option>
                <option value="Nuts & Dry Fruits">Nuts & Dry Fruits</option>
              </select>
              <span></span>
            </div>
            <div className="txt">
              <input
                type="number" required
                name="Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <span></span>
              <label>Price</label>
            </div>

            <div className="txt">
              <input
                type="text" required
                name="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <span></span>
              <label>Description</label>
            </div>
            <div className="txt">
              <img
                alt="Posts"
                width="200px"
                height="200px"
                src={image ? URL.createObjectURL(image) : ""}
              ></img>
              <br />
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <button className="uploadBtn" onClick={handleSubmit}>
              upload and Submit
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;