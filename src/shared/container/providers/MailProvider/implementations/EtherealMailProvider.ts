import {
  getTestMessageUrl,
  createTestAccount,
  createTransport,
  Transporter,
} from "nodemailer";

import SMTPTransport from "nodemailer/lib/smtp-transport";
import { injectable } from "tsyringe";

// Interface
import { ISendMailDTO } from "../dtos/ISendMailDTO";
import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    createTestAccount()
      .then((account) => {
        const transporter = createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail(props: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to: props.to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject: props.subject,
      text: props.body,
      html: props.body,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(message));

    return;
  }
}

export { EtherealMailProvider };
