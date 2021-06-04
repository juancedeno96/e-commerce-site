import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

// MUI Components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
// stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// Util imports
import { makeStyles } from "@material-ui/core/styles";
// Custom Components
import CardInput from "../Component/CardInput";
//Redux
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

const CheckoutPage = (props) => {
  const classes = useStyles();
  // State
  const [userCart, setUserCart] = useState([]);
  const [email, setEmail] = useState(props.email);
  const [userTotal, setUserTotal] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    getUserItems();
    getTotal();
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

  const getTotal = () => {
    const user_id = props.user_id;
    axios
      .get(`/api/total/${user_id}`)
      .then((res) => {
        setUserTotal(res.data);
        setAmount(res.data[0].cost*100)

        
      })
      .catch((err) => console.log(err));
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const res = await axios.post("http://localhost:4001/pay", {
      amount: amount,
      email: email,
    });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank!");
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <div>
      {userTotal.map((tot, i) => {
        return (

          <Card className={classes.root} key={i} >
            Total Cost: ${tot.cost}.00
            <CardContent className={classes.content}>
              <TextField
                label="Email"
                id="outlined-email-input"
                helperText={`Email you'll recive updates and receipts on`}
                margin="normal"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <CardInput />
              <div className={classes.div}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSubmit}
                >
                  Pay
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default withRouter(
  connect(mapStateToProps, { updateUser })(CheckoutPage)
);
