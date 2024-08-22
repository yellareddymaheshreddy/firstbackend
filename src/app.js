import express from 'express'
import cors from 'cors'

const app= express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))

//routes
import userRouter from './routes/user.routes.js'
import confessionRouter from './routes/confession.routes.js'
import infoRouter from './routes/info.routes.js'
import blogRouter from './routes/blog.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/confessions",confessionRouter)
app.use("/api/v1/infoposts",infoRouter)
app.use("/api/v1/blogs",blogRouter)
export {app}