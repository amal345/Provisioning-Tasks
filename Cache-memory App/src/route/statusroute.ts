import express, { Application, Request, Response } from "express";
import { Status_Controller } from "../controller/statuscontroller";
const router = express.Router();
const statuscontroller = new Status_Controller()



router.get('/:key', async (req: Request, res: Response) => {
    try {
        const key = req.params.key
        // console.log(key)
        let data = await statuscontroller.Getuser(key)
        res.end(JSON.stringify(data))
    }
    catch (error:any) {
        console.log(error)
        
        res.status(204).send(`{"error":"${error.message}"}`)
    }
})




router.post('/insert', async (req: Request, res: Response) => {

    try {
        const payload = req.body;
        const data = await statuscontroller.Putuser(payload)
        res.end(JSON.stringify(data))
    }
    catch (error: any) {
        console.log(error)
        res.end(`{"error":"${error.message}"}`)
    }
})




// router.put('/:key/update', async (req: Request, res: Response) => {

//     try {
//         const key = req.params.key
//         const payload = req.body;
//         const data = await statuscontroller.updateSim(key, payload)
//         res.end(JSON.stringify(data))
//     }
//     catch (error: any) {
//         console.log(error)
//         res.end(`{"error":"${error.message}"}`)
//     }
// })



router.delete('/:key/delete', async (req: Request, res: Response) => {

    try {
        const key = req.params.key
        // console.log(key);
        const data = await statuscontroller.deleteSim(key)

        res.end(data)
    }
    catch (error: any) {

        console.log(error)
        res.end(`{"error":"${error.message}"}`)
    }
})




export {
    router
} 