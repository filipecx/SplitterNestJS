import amqp from 'amqplib';
import { IntMessagePublisher } from './IntMessagePublisher';
import { Injectable } from '@nestjs/common';
import { CommError } from './CommError';

@Injectable()
export class RabbitProducer implements IntMessagePublisher {
    async publish(payload: any): Promise<void> {
        console.log("Payload:" + payload)
        try {
            const connection = await amqp.connect('amqp://192.168.0.128');
            const channel = await connection.createChannel();

            const exchange = 'sales';
            const msg = payload;
            const ROUTING_KEY = 'sale.chunk.created'

            await channel.assertExchange(exchange, 'direct', { durable: true });

            channel.publish(exchange, ROUTING_KEY, Buffer.from(JSON.stringify(msg)));

            setTimeout(() => {
                connection.close();
            }, 500);
        } catch (error) {

            console.error("Rabbit error: ", new CommError("Error comunicating with RabbitMQ"));
        }
    }


}
