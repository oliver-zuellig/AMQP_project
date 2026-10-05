import amqp from "amqplib";

const connection = await amqp.connect(
    "amqp://localhost"
);

const channel = await connection.createChannel();

await channel.assertQueue(
    "telemetry.alert.queue",
    { durable: true }
);

await channel.bindQueue(
    "telemetry.alert.queue",
    "telemetry.exchange",
    ""
);

channel.consume(
    "telemetry.alert.queue",
    (msg) => {
        if (msg !== null) {
            const content = msg.content.toString();
            const parsedMsg = JSON.parse(content);
            const temperature = parsedMsg.temperature;
            const humidity = parsedMsg.humidity;
            const timestamp = parsedMsg.timestamp;

            if (temperature > 30) {
                console.log(`ALERT! High temperature detected: ${temperature} at ${timestamp}`);
            }
            if (humidity > 70) {
                console.log(`ALERT! High humidity detected: ${humidity} at ${timestamp}`);
            }

            channel.ack(msg);
        }
    }
);