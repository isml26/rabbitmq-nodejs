const amqp = require("amqplib");

const message = {
    description: "Lorem ipsum dolor sit amet."
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();  
        const assertion = await channel.assertExchange("jobsQueue");
        
        channel.sendToQueue("jobsQueue",Buffer.from(JSON.stringify(message)));
        console.log("Sended Message ->",message);
    } catch (error) {
        console.log("Error: ",error)
    }
}