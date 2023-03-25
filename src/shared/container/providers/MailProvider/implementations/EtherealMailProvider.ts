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

// Handlebars
import handlebars from "handlebars";
import fs from "fs";

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
    const templateFileContent = fs.readFileSync(props.path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(props.variables);

    const message = await this.client.sendMail({
      to: props.to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject: props.subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(message));

    return;
  }
}

export { EtherealMailProvider };
