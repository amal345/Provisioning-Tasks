import express, { Application, Request, Response } from "express";
import { Status_Controller } from "../controller/statuscontroller";
const router = express.Router();
const statuscontroller = new Status_Controller()

router.get('/:key', async (req: Request, res: Response) => {
    const key = req.params.key
    // console.log(key)
    let data = await statuscontroller.Getuser(key)
    // console.log(data.owner)
    // console.log(data.state)
    // console.log(data.phnnumber);

    try {

        res.end(JSON.stringify(data))
    }
    catch (error) {
        console.log(error)
    }


})

router.put('/:key/insert', async (req: Request, res: Response) => {
    const key = req.params.key;
    
    const value = req.body;

    try {
        const data = await statuscontroller.Putuser(key, value)

        res.end(JSON.stringify(data))
    }
    catch (error: any) {
        
        console.log(error)
        res.end(`{"error":"${error.message}"}`)
    }
})


export {
    router
} 