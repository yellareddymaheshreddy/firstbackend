import 'dotenv/config'
import {app} from './app.js'
import { MongoConnect } from './db/index.js'

const PORT=process.env.PORT || 8000

MongoConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    })
})
.catch((er)=>{
    console.log("some error while connecting to db", er)
})