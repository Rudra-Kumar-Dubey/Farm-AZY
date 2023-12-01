import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: name }).then(() => {
          Firebase.firestore().collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            name: name,
            phone: phone,
          });
        });
      })
      .then(() => {
        history.push("/login");
      });
  };
  return (
    <>
      {loading && <SignUpLoading />}
      <div className="signupContainer">
        <div className="center">
          <form onSubmit={handleSubmit}>
            <h2>FarmAZY</h2>
            <div className="txt">
              <input
                type="text" required
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
              <span></span>
              <label>Full Name</label>
            </div>
            <div className="txt">
              <input
                type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt">
              <input
                type="number" required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
              />
              <span></span>
              <label>Phone</label>
            </div>
            <div className="txt">
              <input
                type="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <span></span>
              <label>Password</label>
            </div>
            <input type="submit" value="Signup" />
            <div className="signup-link">
              Already a member? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
