require("dotenv").config();
const massive = require("massive");
const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51IsBidK0LrulUWXA2V1lW4yRQivNOltaaOohQjPtv5xKH56tfXKUZ0MjTkofwGedBxXsxW7DM3dDytPP4fM3omZ100muCJuCHi"
);
const { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
  app.listen(PORT, () => console.log(`running on port ${PORT}`));
});

//Stripe
app.post("/pay", async (req, res) => {
  const { email } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });

  res.json({ client_secret: paymentIntent["client_secret"] });
});
