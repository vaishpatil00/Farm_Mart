import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'


const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))



app.use(express.json()) //all the request is in the form of json
app.use(cookieParser())
app.use(morgan('dev')) //when any api will then it display in terminal
app.use(helmet({
    crossOriginResourcePolicy : false //hlep to resolve the error when backend and frontend is in different folder
}))

const PORT = 8080 || process.env.PORT //process.env.PORT - it will take some other port when 8080 is busy


app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
// app.use('/api/order',orderRouter)


//1st it will connect to mongodb then it will run
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

