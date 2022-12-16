import kafka from 'node-rdkafka'
import {Produce} from './produce'

export class createTopic {
    static kafkaMessageProduce(messages: string) {
        return new Promise((resolve, reject) => {
            try {
                const client = kafka.AdminClient.create({
                    'client.id': 'kafka-admin',
                    'metadata.broker.list': 'localhost:9092'
                  });

                    const result=  client.createTopic({
                        topic: "ConnectivityPro",
                        num_partitions: 2,
                        replication_factor: 1
                      })
                      Produce.produce(messages)
                      resolve(result) 
            }
            catch (error) {
                reject(error);
            }
        })
    }
}