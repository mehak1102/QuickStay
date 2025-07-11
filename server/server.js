import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js";
import { clerkMiddleware} from '@clerk/express'
// import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB()
connectCloudinary();



const app = express()
app.use(cors())

//middleware
app.use(express.json())
app.use(clerkMiddleware())
// app.use(
//   clerkMiddleware({
//     secretKey: process.env.CLERK_SECRET_KEY,
//   })
// );


// app.use(ClerkExpressRequireAuth());


app.use("/api/clerk", clerkWebhooks)

app.get('/', (req,res)=> res.send("API is working"))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)





const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


// import express from "express"
// import "dotenv/config"
// import cors from "cors"
// import connectDB from "./configs/db.js"
// import { clerkMiddleware } from "@clerk/express"
// import clerkWebhooks from "./controllers/clerkWebhooks.js"
// import userRouter from "./routes/userRoutes.js"
// import hotelRouter from "./routes/hotelRoutes.js"
// import connectCloudinary from "./configs/cloudinary.js"
// import roomRouter from "./routes/roomRoutes.js"
// import bookingRouter from "./routes/bookingRoutes.js"

// connectDB()
// connectCloudinary()

// const app = express()

// // ✅ Use secure CORS config here
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://quick-stay-amber.vercel.app"
//   ],
//   credentials: true
// }))

// // Middleware
// app.use(express.json())
// app.use(clerkMiddleware())

// // Routes
// app.use("/api/clerk", clerkWebhooks)
// app.use('/api/user', userRouter)
// app.use('/api/hotels', hotelRouter)
// app.use('/api/rooms', roomRouter)
// app.use('/api/bookings', bookingRouter)

// app.get('/', (req, res) => res.send("API is working"))

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.log(Server running on port ${PORT}))
