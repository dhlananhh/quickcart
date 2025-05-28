import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  userId: { type: String, require: true, ref: "user" },
  name: { type: String, require: true },
  description: { type: Array, require: true },
  price: { type: Number, require: true },
  offerPrice: { type: Number, require: true },
  image: { type: Array, require: true },
  category: { type: String, require: true },
  date: { type: Number, require: true },
}, { timestamps: true })

const Product = mongoose.models.product || mongoose.model("product", productSchema)

export default Product
