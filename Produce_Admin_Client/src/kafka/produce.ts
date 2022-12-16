import kafka from 'node-rdkafka'

export class Produce {
    static produce(message: string) {
        let producer = new kafka.Producer({
            'metadata.broker.list': 'localhost:9092',
            'dr_cb': true
        })
        producer.connect()
        producer.on('ready', () => {
            producer.produce('Greetings', null, Buffer.from(message))
        })
        producer.setPollInterval(100);
    }

}

