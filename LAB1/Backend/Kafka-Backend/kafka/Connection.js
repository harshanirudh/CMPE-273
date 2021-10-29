var kafka = require("kafka-node");
const ipAddress = "localhost";
function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    try{
    this.client = new kafka.KafkaClient(`${ipAddress}:2181`);
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ]);
    this.client.on("ready", function () {
      console.log("client ready!");
    });
  }
    catch(err){
      console.log(err)
    }
    return this.kafkaConsumerConnection;
  }
  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(`${ipAddress}:2181`);
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
