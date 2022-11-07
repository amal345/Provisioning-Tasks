import express from "express";
import { router as statusrouter  } from "./route/statusroute" 

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use('/status', statusrouter)


app.listen(3000, () => {
    console.log('Server listening on port');
});