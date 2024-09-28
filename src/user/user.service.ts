import AppDateSource from "../app/dataSource";
import { UserEntity } from "./entities/user.entity";

export default class UserService {
  userRepository = AppDateSource.getRepository(UserEntity);

  addUser(user: UserEntity) {
    return this.userRepository.save(user);
  }

  deleteUser(userId: number) {
    return this.userRepository.delete(userId);
  }

  getUser(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  isUserExist(name: string) {
    return this.userRepository.exists({ where: { name } });
  }
}
