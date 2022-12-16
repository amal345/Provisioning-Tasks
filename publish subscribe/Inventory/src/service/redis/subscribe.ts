import Redis from 'ioredis';

export class inventorySubscribe {
    static async inventorySubscriber() {
        return new Promise<inventorySubscribe>((resolve, reject) => {
            const redis = new Redis();
            redis.subscribe("my-channel-1", "my-channel-2", (err, count) => {
                if (err) {
                    console.error("Failed to subscribe: %s", err.message);
                    reject(err);
                } else {
                    console.log(
                        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
                    );
                }
            });
            redis.on('message', (channel, message) => { 
                resolve(JSON.parse(message))
            })
        })

    }
}