import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectdb from '../config/mongodb.js'; // Ensure this path is correct
import connectcloudinary from '../config/cloudinary.js';
import userrouter from '../routes/userroute.js';
import productrouter from '../routes/productroute.js';
import cartroute from '../routes/cartroute.js';
import categoryrouter from '../routes/categoryroutes.js';
import flashproductroute from '../routes/flashproductroutes.js';
import hotproductroutes from '../routes/hotproductroutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectdb();

// Connect to cloudinary
connectcloudinary();

// App config
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userrouter);
app.use('/api/products', productrouter);
app.use('/api/cart', cartroute);
app.use('/api/category', categoryrouter);
app.use('/api/flashproducts', flashproductroute);
app.use('/api/hotproducts', hotproductroutes);



app.get("/", (req,res) => {
    res.json ("hello")})


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running `);
});