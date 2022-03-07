const amqp = require("amqplib");
const data = require("./data.json");
const queueName = process.argv[2] || "jobsQueue";


const message = {
    description: "Lorem ipsum dolor sit amet."
}

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertExchange(queueName);

        data.forEach(i=>{
            message.description = i.id;
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Sended Message ->", i.id);
        });
       

        /////////// INTERVAL ///////////////////
        // setInterval(()=>{
        //     message.description =  new Date().getTime();
        //     channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
        //     console.log("Sended Message ->",message);
        // },10);

    } catch (error) {
        console.log("Error: ", error)
    }
}