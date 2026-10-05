import amqp from "amqplib";


const connection = await amqp.connect(
    "amqp://localhost"
);

const channel = await connection.createChannel();

await channel.assertQueue("telemetry");

function createSendingMessage() {

    const reading = () => {
        return {
            temperature: (Math.random() * 100).toFixed(1),
            humidity: (Math.random() * 100).toFixed(1),
            timestamp: new Date().toISOString()
        };
    };

    for (let i = 0; i < 10; i++) {
        let product = reading();
        console.log('product',product);
        channel.sendToQueue(
            "telemetry",
            Buffer.from(JSON.stringify(product))
        );
    }


}
createSendingMessage();

await channel.close();
await connection.close();