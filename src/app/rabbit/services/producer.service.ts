import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProducerService {
  public readonly logger = new Logger(ProducerService.name)

  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) {}

  public async sayHelloExchange(queue: string, exchange = ''): Promise<void> {
    this.logger.log('sayHelloExchange | sent a message!'); // need to remove this. i think

    return this.amqpConnection.publish(exchange, queue, 'Hello from rabbit');
  }

  public async addMessage<T>(queue: string, request: T): Promise<void> {
    return this.amqpConnection.publish('', queue, request);
  }
}
