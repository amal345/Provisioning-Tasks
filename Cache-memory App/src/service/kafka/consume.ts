
import kafka from 'node-rdkafka'
import {ProcessSimDirectory} from "../../usecase/ProcessSimDirectory"

export class Consume {

    static async kafkaConsumer() {
        return new Promise((resolve, rejects) => {
            try{
            var consumer = new kafka.KafkaConsumer({
                'group.id': 'kafka',
                'metadata.broker.list': 'localhost:9092',
            }, {});
            consumer.connect();
            consumer
                .on('ready', function () {
                    consumer.subscribe(['request-creation']);
                    consumer.consume();
                })
                .on('data', (data: any)=> {
                    resolve(data.value.toString());
                    const requests=JSON.parse(data.value.toString())
                    // console.log(requests);
                    
                     ProcessSimDirectory.Update(requests)
                });
            }
            catch (err) {
                rejects(err);

            }
        })

    }
}