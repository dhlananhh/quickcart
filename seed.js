require("dotenv").config();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  cartItems: { type: Object, default: {} },
}, { minimize: false, timestamps: true });

const User = mongoose.models.user || mongoose.model("user", userSchema);

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: "user" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: [String], required: true },
  category: { type: String, required: true },
  date: { type: Number, required: true },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model("product", productSchema);

const addressSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: "user" },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincode: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
}, { timestamps: true });

const Address = mongoose.models.address || mongoose.model("address", addressSchema);

const orderItemSchema = new mongoose.Schema({
  product: {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: [String],
    category: { type: String, required: true },
    date: { type: Number, required: true },
  },
  quantity: { type: Number, required: true },
}, { _id: true });

const orderSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: "user" },
  items: [orderItemSchema],
  amount: { type: Number, required: true },
  address: {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pincode: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  status: { type: String, default: "Order Placed" },
  date: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

const productsDummyData = [
  {
    "_id": "67a1f4e43f34a77b6dde9144",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw", // User này cần tồn tại trong userDummyData
    "name": "Apple AirPods Pro 2nd gen",
    "description": "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
    "price": 499.99,
    "offerPrice": 399.99,
    "image": [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp",
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/j212frakb8hdrhvhajhg.webp",
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/imwuugqxsajuwqpkegb5.webp",
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k1oqaslw5tb3ebw01vvj.webp"
    ],
    "category": "Earphone",
    "date": 1738667236865
  },
  {
    "_id": "67a1f52e3f34a77b6dde914a",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Bose QuietComfort 45",
    "description": "The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation. With a 24-hour battery life and comfortable, lightweight design, these headphones deliver premium audio for any environment. Whether on a flight, in the office, or at home, the Bose QC45 blocks out distractions, offering an immersive listening experience.",
    "price": 429.99,
    "offerPrice": 329.99,
    "image": [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp"
    ],
    "category": "Headphone",
    "date": 1738667310300
  },
  {
    "_id": "67a1f5663f34a77b6dde914c",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Samsung Galaxy S23",
    "description": "The Samsung Galaxy S23 offers an all-encompassing mobile experience with its advanced AMOLED display, offering vibrant visuals and smooth interactions. Equipped with top-of-the-line fitness tracking features and cutting-edge technology, this phone delivers outstanding performance. With powerful hardware, a sleek design, and long battery life, the S23 is perfect for those who demand the best in mobile innovation.",
    "price": 899.99,
    "offerPrice": 799.99,
    "image": [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp"
    ],
    "category": "Smartphone",
    "date": 1738667366224
  },
  {
    "_id": "67a1f5993f34a77b6dde914e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "Garmin Venu 2",
    "description": "The Garmin Venu 2 smartwatch blends advanced fitness tracking with sophisticated design, offering a wealth of features such as heart rate monitoring, GPS, and sleep tracking. Built with a 24-hour battery life, this watch is ideal for fitness enthusiasts and anyone looking to enhance their daily lifestyle. With a stunning AMOLED display and customizable watch faces, the Venu 2 combines technology with style seamlessly.",
    "price": 399.99,
    "offerPrice": 349.99,
    "image": [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp"
    ],
    "category": "Watch",
    "date": 1738667417511
  },
  {
    "_id": "67a1f5ef3f34a77b6dde9150",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "PlayStation 5",
    "description": "The PlayStation 5 takes gaming to the next level with ultra-HD graphics, a powerful 825GB SSD, and ray tracing technology for realistic visuals. Whether you're into high-action games or immersive storytelling, the PS5 delivers fast loading times, seamless gameplay, and stunning visuals. It's a must-have for any serious gamer looking for the ultimate gaming experience.",
    "price": 599.99,
    "offerPrice": 499.99,
    "image": [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp"
    ],
    "category": "Accessories",
    "date": 1738667503075
  },
  // Thêm các sản phẩm khác từ productsDummyData của bạn tại đây
];

const userDummyData = [
  {
    "_id": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "name": "GreatStack Demo",
    "email": "greatstack.demo@example.com",
    "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycnlnUnFiUDBYT2dEZ2h1ZmRXcGlpdWV5OXoiLCJyaWQiOiJ1c2VyXzJzWkZIUzFVSUl5c0p5RFZ6Q3BRaFVoVElodyJ9",
    "cartItems": {
      "67a1f4e43f34a77b6dde9144": 1,
      "67a1f52e3f34a77b6dde914a": 2
    }
  },
];

const addressDummyData = [
  {
    "_id": "67a1e4233f34a77b6dde9055",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "fullName": "GreatStack Demo",
    "phoneNumber": "123-456-7890",
    "pincode": "90210",
    "area": "123 Developer Way, Suite 100",
    "city": "Techtown",
    "state": "Calisota",
  },
];

const productForOrder1 = productsDummyData.find(p => p._id === "67a1f4e43f34a77b6dde9144");
const productForOrder2 = productsDummyData.find(p => p._id === "67a1f52e3f34a77b6dde914a");
const primaryAddressForOrder = addressDummyData.find(a => a._id === "67a1e4233f34a77b6dde9055");

const orderDummyData = [];

if (productForOrder1 && productForOrder2 && primaryAddressForOrder) {
  orderDummyData.push(
    {
      "_id": "67a20934b3db72db5cc77b2b",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "items": [
        {
          "product": {
            "_id": productForOrder1._id,
            "userId": productForOrder1.userId,
            "name": productForOrder1.name,
            "description": productForOrder1.description,
            "price": productForOrder1.price,
            "offerPrice": productForOrder1.offerPrice,
            "image": productForOrder1.image,
            "category": productForOrder1.category,
            "date": productForOrder1.date,
          },
          "quantity": 1
        },
        {
          "product": {
            "_id": productForOrder2._id,
            "userId": productForOrder2.userId,
            "name": productForOrder2.name,
            "description": productForOrder2.description,
            "price": productForOrder2.price,
            "offerPrice": productForOrder2.offerPrice,
            "image": productForOrder2.image,
            "category": productForOrder2.category,
            "date": productForOrder2.date,
          },
          "quantity": 2
        }
      ],
      "amount": parseFloat(((productForOrder1.offerPrice * 1) + (productForOrder2.offerPrice * 2) + 7.00).toFixed(2)),
      "address": {
        "_id": primaryAddressForOrder._id,
        "userId": primaryAddressForOrder.userId,
        "fullName": primaryAddressForOrder.fullName,
        "phoneNumber": primaryAddressForOrder.phoneNumber,
        "pincode": primaryAddressForOrder.pincode,
        "area": primaryAddressForOrder.area,
        "city": primaryAddressForOrder.city,
        "state": primaryAddressForOrder.state,
      },
      "status": "Order Placed",
      "date": Date.now()
    },
    {
      "_id": "67a20949b3db72db5cc77b2c",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "items": [
        {
          "product": {
            "_id": productForOrder1._id,
            "userId": productForOrder1.userId,
            "name": productForOrder1.name,
            "description": productForOrder1.description,
            "price": productForOrder1.price,
            "offerPrice": productForOrder1.offerPrice,
            "image": productForOrder1.image,
            "category": productForOrder1.category,
            "date": productForOrder1.date,
          },
          "quantity": 3
        }
      ],
      "amount": parseFloat(((productForOrder1.offerPrice * 3) + 5.50).toFixed(2)),
      "address": primaryAddressForOrder,
      "status": "Order Placed",
      "date": Date.now() - 24 * 60 * 60 * 1000
    }
  );
} else {
  console.warn("WARNING: Could not find all necessary product/address data for seeding orders. Orders will not be seeded.");
}
// --- END Dummy Data ---

// --- Database Connection ---
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error("FATAL ERROR: MONGODB_URI is not defined.");
      process.exit(1);
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully to:", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// --- Seed Function ---
const seedDatabase = async () => {
  try {
    console.log("Starting to seed database...");

    console.log("Clearing existing data...");
    await User.deleteMany({});
    console.log("Users collection cleared.");
    await Product.deleteMany({});
    console.log("Products collection cleared.");
    await Address.deleteMany({});
    console.log("Addresses collection cleared.");
    await Order.deleteMany({});
    console.log("Orders collection cleared.");

    // Chèn dữ liệu mới
    console.log("Seeding new data...");
    await User.insertMany(userDummyData);
    console.log(`${userDummyData.length} users seeded.`);
    await Product.insertMany(productsDummyData);
    console.log(`${productsDummyData.length} products seeded.`);
    await Address.insertMany(addressDummyData);
    console.log(`${addressDummyData.length} addresses seeded.`);
    await Order.insertMany(orderDummyData);
    console.log(`${orderDummyData.length} orders seeded.`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// --- Main Execution ---
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
  await mongoose.disconnect();
  console.log("MongoDB disconnected.");
};

runSeed();
