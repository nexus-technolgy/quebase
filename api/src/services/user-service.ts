import type { ServiceConstructorOptions, User } from "../models";
import { newUserTemplate } from "../templates";
import { DataService, SearchQuery } from "./firestore-service";

export type UserCreateRequest = Pick<User, "handle" | "locale" | "avatar">;

export type UserUpdateRequest = Partial<UserCreateRequest>;

export class UserService {
  private auth;
  private logger;
  private collection = "users";
  constructor({ logger = console, auth }: ServiceConstructorOptions) {
    this.auth = auth;
    this.logger = logger;
  }

  async readAll(): Promise<User[]> {
    this.logger.debug("User::readAll");
    return await new DataService(this.auth, this.collection).readAll<User>();
  }

  async search(handle: string): Promise<User[]> {
    const searchParams: SearchQuery<User>[] = [
      ["handle", ">=", handle],
      ["handle", "<=", handle + "\uf7ff"],
    ];
    this.logger.debug("User::search", { handle });
    return await new DataService(this.auth, this.collection).find<User>(searchParams);
  }

  async read(id: string): Promise<User> {
    this.logger.debug("User::read", { id });
    return await new DataService(this.auth, this.collection, id).read<User>();
  }

  async create(params: UserCreateRequest): Promise<User> {
    this.logger.debug("User::create", params);
    const user = {
      uid: this.auth.uid,
      ...newUserTemplate,
      ...params,
    };
    return await new DataService(this.auth, this.collection).write(user);
  }

  async update(id: string, params: UserUpdateRequest): Promise<Partial<User>> {
    this.logger.debug("User::update", params);
    return await new DataService(this.auth, this.collection, id).updateOwn(params);
  }

  async delete(id: string): Promise<void> {
    this.logger.debug("User::delete");
    await new DataService(this.auth, this.collection, id).deleteOwn();
    return;
  }
}
