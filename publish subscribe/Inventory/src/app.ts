import express from 'express';
import {router as inventoryRoute } from'./route/inventoryroute'
import {inventorySubscribe} from './service/redis/subscribe'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
inventorySubscribe.inventorySubscriber()
app.use('/inventory', inventoryRoute);
app.listen(2001,() => {
    console.log('Inventory server listening on port 2001');
    
});