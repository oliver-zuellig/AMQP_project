import amqp from "amqplib";

const connection = await amqp.connect(
    "amqp://localhost"
);

const channel = await connection.createChannel();

await channel.assertQueue(
    "telemetry.storage.queue",
    { durable: true }
);

await channel.bindQueue(
    "telemetry.storage.queue",
    "telemetry.exchange",
    ""
);

channel.consume(
    "telemetry.storage.queue",
    (msg) => {
        if (msg !== null) {
            const content = msg.content.toString();
            console.log("Received message:", JSON.parse(content));
            channel.ack(msg);
        }
    }
);