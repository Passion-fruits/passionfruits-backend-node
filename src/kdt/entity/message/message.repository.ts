import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  public async donateKdt(
    id: number,
    question: string,
    user_id: number,
    artist_id: number,
  ): Promise<void> {
    let newMessage: Message;
    newMessage = this.create({
      id,
      question,
      user_id,
      artist_id,
    });
    await this.save(newMessage);
  }
}
