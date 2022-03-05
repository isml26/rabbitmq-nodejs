const amqp = require("amqplib");

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue("jobsQueue");

        // Receive message
        channel.consume("jobsQueue", message => {
            console.log("Received message ->", message.content.toString());
        });

    } catch (error) {
        console.log("asdjhkskljdbh")
    }
}