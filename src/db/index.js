import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const MongoConnect =async()=>{
    try {
        const dbInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongodb connected successfull host:${dbInstance.connection.host}`)

    } catch (error) {
        console.log("Error while connecting to database",error)
        process.exit(1)
    }
}
export {MongoConnect}