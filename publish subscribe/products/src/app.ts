import express from 'express';
import {router as productRouter} from './router/productRoute'
import {inventorySubscribe} from './service/rdis/subscribe'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product',productRouter)
// inventorySubscribe.inventorySubscriber();

app.listen(2005,() => {
    console.log('Production server listening on port 2005');
    
});