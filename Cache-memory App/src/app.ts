import express from "express";
import { router as statusrouter } from "./route/statusroute"
import * as path from "path";
import { DbConfig } from './config/DbConfig'
import {Consume} from './service/kafka/consume'
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/status', statusrouter)

const publicpath = path.resolve(__dirname, 'public')
app.use(publicpath, express.static('test'));

DbConfig.connection().then(() => {
    console.log(`DataBase has been connected successfully in port:5432`);
}).catch((error) => console.error(`DataBase connection error`, error))


Consume.kafkaConsumer().then(()=>{
console.log("COnsuming the data from the kafka consumer");
})


app.listen(3000, () => {
    console.log('Server listening on port');
});
