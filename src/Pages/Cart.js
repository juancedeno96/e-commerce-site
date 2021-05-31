import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";
import { Link, withRouter } from "react-router-dom";

const Cart = (props) => {
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    getUserItems();
  }, [props]);

  //Get Cart Items function
  const getUserItems = () => {
    const user_id = props.user_id;
    axios
      .get(`/api/cart/${user_id}`)
      .then((res) => {
        setUserCart(res.data);
      })
      .catch((err) => console.log(err));
  };

  //Delete single item function
  const deleteItems = (product_id) => {
    axios.delete(`/api/delete/${product_id}`).catch((err) => console.log(err));
  };

  //mapped userCart
  const mappedUserItems = userCart.map(item=>{
    return (
      <div className="cart-item" key={item.order_id}>
        <h1>{item.product_name}</h1>
        <img src={item.img_url} alt={item.product_name} />
        <h3>X {item.quantity}</h3>
        <h3>total: {item.total}.00</h3>
      </div>
    )
  })

  return <div>{mappedUserItems}</div>;
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default withRouter(connect(mapStateToProps, { updateUser })(Cart));