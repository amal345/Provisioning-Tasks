import express from "express";
import {createTopic} from "./kafka/createTopic"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5025,()=>{
    console.log("server listening on 5025");
    
})

createTopic.kafkaMessageProduce("hello World").then(() => {
    console.log("Topic Created and message generated successfully")    
}).catch(err => console.log(err))




