import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Firebase } from "../../firebase/config";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false)
  const history = useHistory()
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      history.push("/")
    }).catch((error) => {
      alert(error.message)
    })

  };
  return (<>
    {loading && <RoundLoading />}
    <div className="loginContainer">
      <div className="center">
        <form onSubmit={handleSubmit}>
          <h2>FarmAZY</h2>

          <div className="txt">
            <input type="email" required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
              <span></span>
            <label>Email</label>
          </div>

          <div className="txt">
            <input type="password" required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
              <span></span>
            <label>Password</label>
          </div>

          <input type="submit" value="Login"/>

          <div  className="signup-link">
              Not a member? <Link to="/signup">Signup</Link>
          </div>
          
        </form>
        
      </div>
    </div>
  </>
  );
}

export default Login;
