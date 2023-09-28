import type { Player, ServiceConstructorOptions } from "../models";
import { newPlayerTemplate } from "../templates";
import { DataService, SearchQuery } from "./firestore-service";

export type PlayerCreateRequest = Pick<Player, "handle" | "locale" | "avatar">;

export type PlayerUpdateRequest = PlayerCreateRequest;

export class PlayerService {
  private auth;
  private logger;
  private collection = "players";
  constructor({ logger = console, auth }: ServiceConstructorOptions) {
    this.auth = auth;
    this.logger = logger;
  }

  async readAll(): Promise<Player[]> {
    this.logger.debug("Player::readAll");
    return await new DataService(this.auth, this.collection).readAll<Player>();
  }

  async search(handle: string): Promise<Player[]> {
    const searchParams: SearchQuery[] = [
      ["handle", ">=", handle],
      ["handle", "<=", handle],
    ];
    this.logger.debug("Player::search", { handle });
    return await new DataService(this.auth, this.collection).find<Player>(searchParams);
  }

  async read(id: string): Promise<Player> {
    this.logger.debug("Player::read", { id });
    return await new DataService(this.auth, this.collection, id).read<Player>();
  }

  async create(params: PlayerCreateRequest): Promise<Player> {
    this.logger.debug("Player::create", params);
    const player = {
      uid: this.auth.uid,
      ...newPlayerTemplate,
      ...params,
    };
    return await new DataService(this.auth, this.collection).write(player);
  }

  async update(id: string, params: PlayerUpdateRequest): Promise<Partial<Player>> {
    this.logger.debug("Player::update", params);
    const updates = {
      ...params,
    };
    return await new DataService(this.auth, this.collection, id).updateOwn(updates);
  }

  async delete(id: string): Promise<void> {
    this.logger.debug("Player::delete");
    await new DataService(this.auth, this.collection, id).deleteOwn();
    return;
  }
}
