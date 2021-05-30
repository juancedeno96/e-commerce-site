module.exports = {
  getProduct: async (req, res) => {
    const db = req.app.get("db");
    allProduct = await db.product.get_product();
    return res.status(200).send(allProduct);
  },

  addOrder: async (req, res) => {
    const db = req.app.get("db");
    const { total, user_id, quantity } = req.body;
    const { product_id } = req.params;
    let order;
    try {
      order = await db.order.add_order(total, user_id, product_id, quantity);
    } catch (err) {
      console.log(err);
    }
    return res.status(200).send(order);
  },

  getUserItems: async (req, res) => {
    const { user_id } = req.params;
    const db = req.app.get("db");
    let items = await db.order.get_items_by_user_id(user_id);
    return res.status(200).send(items);
  },
};
