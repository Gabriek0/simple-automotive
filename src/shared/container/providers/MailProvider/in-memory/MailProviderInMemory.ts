import { ISendMailDTO } from "../dtos/ISendMailDTO";
import { IMailProvider } from "../IMailProvider";

type Message = ISendMailDTO;

class MailProviderInMemory implements IMailProvider {
  private message: Message[] = [];

  async sendMail(props: ISendMailDTO): Promise<void> {
    this.message.push({ ...props });
  }
}

export { MailProviderInMemory };
