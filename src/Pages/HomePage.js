import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";
import ProductItem from "../Component/ProductItem";
import '../styles/_home.scss';

const HomePage = (props) => {
  console.log(props);
  return (
    <div className="HomePage">
      <ProductItem />
    </div>
  );
};
const mapToStateProps = (reduxState) => reduxState;

export default connect(mapToStateProps, { updateUser })(HomePage);
