import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";
import { getAllProduct } from "../redux/productReducer";
import { addToCart } from "../redux/cartReducer";

const ProductItem = (props) => {
  const [total, setTotal] = useState(0);
  const [user_id, setUserId] = useState(props.userReducer.user_id);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (value, unit_price) => {
    setQuantity(value);
    setTotal(value * unit_price);
  };

  //Get Product function
  const getProduct = () => {
    axios
      .get("/api/product")
      .then((res) => {
        props.getAllProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  //Add To Cart Function
  const addToCart=(product_id)=>{
    axios.post(`/api/add/${product_id}`, { total, user_id, quantity })
    .then(res=>{
      props.addToCart(res.data)
      setQuantity(0);
      props.history.push('/home')

    })
    .catch(err=>console.log(err))
}

  const { product } = props.productReducer;
  return (
    <div className="ProductItem">
      <div className="product-container">
        {product.map((item) => {
          return (
            <div className="mapped-product" key={item.product_id}>
              <img
                src={item.img_url}
                alt={item.product_name}
                className="product-img"
              />
              <p className="product-name">{item.product_name}</p>
              <p className="price">${item.unit_price}.00</p>
           
             <button onClick={(e)=>{
            addToCart(item.product_id)}}>add to cart</button>
          
            <input value={quantity} type="number" min="1" max="10" onChange={(e)=>{handleChange(+e.target.value, item.unit_price)}}
           />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  userReducer: reduxState.userReducer,
  productReducer: reduxState.productReducer,
  cartReducer: reduxState.cartReducer,
});

export default connect(mapStateToProps, {
  updateUser,
  getAllProduct,
  addToCart,
})(ProductItem);
