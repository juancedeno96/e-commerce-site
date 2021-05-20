import React from 'react'
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";
import ProductItem from '../Component/ProductItem';


 const HomePage = (props) => {
     console.log(props)
    return (
        <div>
            <h1 className="homepage-title">HomePage</h1>
            <ProductItem/>
        </div>
    )
}
const mapToStateProps = (reduxState) => reduxState;

export default connect(mapToStateProps, { updateUser })(HomePage);


