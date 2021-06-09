require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
//Controllers
const authCtrl = require("./controllers/authController");
const pc = require("./controllers/productController");
//Stripe
const stripe = require("stripe")(
  "sk_test_51IsBidK0LrulUWXA2V1lW4yRQivNOltaaOohQjPtv5xKH56tfXKUZ0MjTkofwGedBxXsxW7DM3dDytPP4fM3omZ100muCJuCHi"
);
const { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
  app.listen(PORT, () => console.log(`running on port ${PORT}`));
});

//Session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

//Stripe
app.post("/pay", async (req, res) => {
  const { email, amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });

  res.json({ client_secret: paymentIntent["client_secret"] });
});

//Auth Endpoints
app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.get("/api/me", authCtrl.getUser);
app.post("/api/logout", authCtrl.logout);

//Product Endpoints
app.get("/api/product", pc.getProduct);
app.post("/api/add/:product_id", pc.addOrder);
app.get("/api/cart/:user_id", pc.getUserItems);
app.delete("/api/delete/:product_id", pc.deleteItem);
app.delete("/api/delete/:user_id", pc.deleteOrder);
app.get("/api/total/:user_id", pc.getTotal);
