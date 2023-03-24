import { v4 as uuid } from "uuid";
import { inject, injectable } from "tsyringe";

// Erro instance
import { AppError } from "@shared/errors/AppError";

// Interfaces
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private userTokensRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuid();

    const expires_date = this.dayjsDateProvider.addHours(3);

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    this.mailProvider.sendMail({
      to: email,
      subject: "Recuperação de Senha",
      body: `O link para o reset é ${token}`,
    });
  }
}

export { SendForgotPasswordMailUseCase };
