import amqp from "amqplib";


const connection = await amqp.connect(
    "amqp://localhost"
);

const channel = await connection.createChannel();

await channel.assertQueue("telemetry");

function createSendingMessage() {

    const reading = () => {
        return {
            temperature: Math.random() * 100,
            humidity: Math.random() * 100,
            timestamp: new Date().toISOString()
        };
    };

    for (let i = 0; i < 10; i++) {
        channel.sendToQueue(
            "telemetry",
            Buffer.from(JSON.stringify(reading()))
        );
    }


}
createSendingMessage();

await channel.close();
await connection.close();