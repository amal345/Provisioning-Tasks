import express from  'express'
import {productPublish} from '../service/rdis/publish'
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message:`redis publisher is Active `})
})

router.get('/publish',async(req, res)=>{
    const id:number=Math.floor(Math.random()*20+1)

    var products:string[]= [ "SmartPhone","SmartTv", "Laptops","Tablets"];
    const product={
        id,
        name:products[Math.floor(Math.random()*products.length)]
    }
    await productPublish.productPublisheer(product)
    res.status(200).json(product)

})

export{
    router
}