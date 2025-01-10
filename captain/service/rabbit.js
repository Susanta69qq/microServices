import amqp from "amqplib";

let connection, channel;

const connectRabbit = async () => {
  try {
    connection = await amqp.connect(process.env.RABBIT_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    process.exit(1);
  }
};

const subscribeToQueue = async (queueName, callback) => {
  if (!channel) await connectRabbit();
  await channel.assertQueue(queueName);
  channel.consume(queueName, (message) => {
    callback(message.content.toString());
    channel.ack(message);
  });
};

const publishToQueue = async (queueName, data) => {
  if (!channel) await connectRabbit();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(data));
};

export { subscribeToQueue, publishToQueue, connectRabbit };
