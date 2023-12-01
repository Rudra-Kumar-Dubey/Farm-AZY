import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import B2CLogo from "../../assets/B2CLogo";
import SearchIcon from "../../assets/SearchIcon";
import Arrow from "../../assets/Arrow";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";

function Header() {
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch = (value) => {
    setPostContent(value);
    history.push("/view");
  };
  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
  };
  const { user } = useContext(AuthContext);

  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
            <B2CLogo/>
          </Link>
        </div>
        <div className="placeSearch">
          <input
            type="text"
            placeholder="Search specific product..."
            value={wordEntered}
            onChange={handleFilter}
          />
          {filteredData.length === 0 ? (
            <div onClick={handleEmptyClick}>
              {" "}
              <SearchIcon />{" "}
            </div>
          ) : (
            <div id="clearBtn" onClick={clearInput}>
              {" "}
              <Arrow></Arrow>
            </div>
          )}
          {filteredData.length !== 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <div
                    key={key}
                    className="dataItem-header"
                    onClick={() => handleSelectedSearch(value)}
                  >
                    <p>{value.name} </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="productSearch">
          <Search />
        </div>
        {/*adding english*/}
        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}

        <Link to="/create">
          {" "}
          {/* <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div> */}
          <button class="cta">
            <span>Sell &nbsp; <AddShoppingCartIcon /></span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              {/* <path d="M1,5 L11,5"></path> */}
              {/* <polyline points="8 1 12 5 8 9"></polyline> */}

            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
