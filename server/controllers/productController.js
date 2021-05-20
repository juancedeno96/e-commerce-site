module.exports={
    getProduct: async (req, res) => {
        const db = req.app.get('db')
        allProduct = await db.product.get_product()
        return res.status(200).send(allProduct)
    }
}