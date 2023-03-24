import { ISendMailDTO } from "./dtos/ISendMailDTO";

interface IMailProvider {
  sendMail(props: ISendMailDTO): Promise<void>;
}

export { IMailProvider };
