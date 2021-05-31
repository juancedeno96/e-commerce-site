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

  deleteItem: (req, res) => {
    const { product_id } = req.params;
    const db = req.app.get("db");
    const updatedCart = db.order.delete_items(product_id);
    return res.status(200).send(updatedCart);
  },

  getTotal: async (req, res) => {
    const { user_id } = req.params;
    const db = req.app.get("db");
    const total = await db.order.get_grand_total(user_id);
    return res.status(200).send(total);
  },

  deleteOrder: (req, res) => {
    const { user_id } = req.params;
    const db = req.app.get("db");
    const finalOrder = db.order.delete_completed_order(user_id);
    return res.status(200).send(finalOrder);
  },
};
