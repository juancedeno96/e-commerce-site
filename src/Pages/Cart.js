import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser} from "../redux/userReducer";
import { Link, withRouter } from "react-router-dom";


const Cart = (props) => {

    const [userCart, setUserCart] = useState([])
    useEffect(() => {
        getUserItems();
      }, [props]);

      const getUserItems = () => {
  
        const user_id = props.user_id;
        axios
          .get(`/api/cart/${user_id}`)
          .then((res) => {
            setUserCart(res.data);
          })
          .catch((err) => console.log(err));
      };
    console.log(userCart)
  return <div>Cart Page</div>;
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default withRouter(connect(mapStateToProps, { updateUser })(Cart))
