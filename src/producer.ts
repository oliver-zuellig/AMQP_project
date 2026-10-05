import amqp from "amqplib";


const connection = await amqp.connect(
    "amqp://localhost"
);

const channel = await connection.createChannel();

await channel.assertExchange(
    "telemetry.exchange",
    "fanout",
    { durable: true }
);

function createSendingMessage(): void {

    const reading = () => {
        return {
            temperature: (Math.random() * 100).toFixed(1),
            humidity: (Math.random() * 100).toFixed(1),
            timestamp: new Date().toISOString()
        };
    };

    for (let i = 0; i < 10; i++) {
        let product = reading();
        console.log('product', product);
        channel.publish(
            "telemetry.exchange",
            "",
            Buffer.from(JSON.stringify(product))
        );
    }


}
createSendingMessage();

await channel.close();
await connection.close();