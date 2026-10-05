This Project demonstrates the use of AMQP protocol for messaging between distributed systems.

## Features
- Asynchronous messaging
- Reliable message delivery
- Support for multiple messaging patterns (e.g., publish/subscribe, request/reply)

## Requirements
- RabbitMQ server
- node.js
- amqplib library

## Usage
1. Start the RabbitMQ server.
2. Run the producer script to send messages.
3. Run the consumer script to receive messages.

## Docker
1. Build the Docker image for the RabbitMQ server:
   ```bash
   docker build -t my-rabbitmq .
   ```
2. Run the RabbitMQ container:
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 my-rabbitmq
   ```
3. Access the RabbitMQ management interface by opening a web browser and navigating to `http://localhost:15672`. The default username and password are both `guest`.