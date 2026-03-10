const express = require("express");
const mongoose = require("mongoose"); // help you to connect server with database
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')

const dotenv = require('dotenv');

dotenv.config();

const mongo_url = process.env.DB_URL;

mongoose.connect(mongo_url
).then(() => console.log("MongoDB connected"))  // return a promise once promise resolved that means connected server with database
.catch((error) => console.log(error))


const app = express() // create app
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true,
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use('/api/admin/products', adminProductsRouter)


//----> /api/auth/register ---> registerUser
//----> /api/auth/login ---> loginUser

app.listen(PORT, ()=> console.log(`Server Running😎 on PORT${PORT}`))