import "./App.css";
import '../src/index.scss'
import HomePage from "./Pages/HomePage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

  const stripePromise = loadStripe('pk_test_51IsBidK0LrulUWXA1zO0t8R70eZ0XYTeTFvirW8GxmXF6u2ID0f7Z5CIBAdiYjkF6sYCkWvinvjDBnAV1G69c1nd001zR2BuSC');


function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <HomePage />
      </Elements>
    </div>
  );
}

export default App;
