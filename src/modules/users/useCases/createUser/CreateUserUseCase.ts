import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error(
        "Um usuário com esse email já possui cadastro no sistema."
      );
    }
    const newUser = this.usersRepository.create({ name, email });
    return newUser;
  }
}

export { CreateUserUseCase };
