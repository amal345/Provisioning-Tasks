
import kafka from 'node-rdkafka'

export class Produce {

    kafkaProducer(responseResult:{}) {
        let producer = new kafka.Producer({
            'metadata.broker.list':'localhost:9092',
            'dr_cb':true
        })
        producer.connect()
        producer.on('ready', () =>{
            try{
              const Message= producer.produce('request-completion', null,Buffer.from(JSON.stringify(responseResult)))
              console.log(Message);  
              return Message;
            }
            catch(error){
                console.error('A problem occurred when sending our message');
                console.error(error);
            }
        })
        producer.setPollInterval(100);
    }
}