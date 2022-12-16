import Redis from 'ioredis';

export class productPublish {
    static async productPublisheer(product: { id: number; name: string; }) {
        const redis = new Redis();
        const channel = `my-channel-${1 + Math.round(Math.random())}`;
         redis.publish(channel, JSON.stringify(product))
         console.log("Published ", product, channel);
    }
}