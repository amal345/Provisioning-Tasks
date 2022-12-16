import express from 'express'
import {inventorySubscribe} from '../service/redis/subscribe'
const router= express.Router();
let productList: any[]=[]
router.get('/', (req, res) => {
    res.status(200).json({message:`redis subscription is Active`})
})
router.get('/productslist',async (req, res) => {
   
    const products= await inventorySubscribe.inventorySubscriber()
    console.log("hii",products);
    productList.push(products)
    console.log(productList); 
    res.status(200).json({productList})
})

export{
    router
}