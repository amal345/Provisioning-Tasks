import Redis from 'ioredis';

export class inventorySubscribe {
    static async inventorySubscriber() {
        const redis = new Redis();
        let products: any[] = []
        const channel = `my-channel-${1 + Math.round(Math.random())}`;
       redis.subscribe("my-channel-1", "my-channel-2", (err, count) => {
            if (err) {
              console.error("Failed to subscribe: %s", err.message);
            } else {
              console.log(
                `Subscribed successfully! This client is currently subscribed to ${count} channels.`
              );
            }
          });
        redis.on('message', (channel, message) => {
            console.log(`Received ${message} from ${channel}`);
            products.push(JSON.parse(message))
            console.log(`Received ${message} from ${channel}`);
            console.log("hello");
            
            return products
        })
    }
}