import { HttpStatusCode } from "axios";
import { Request as ExpressRequest } from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route } from "tsoa";

import { Player } from "../models";
import { PlayerCreateRequest, PlayerService, PlayerUpdateRequest } from "../services";

@Route("v1/players")
export class PlayerControllerV1 extends Controller {
  @Post() // CREATE
  public async createPlayer(
    @Request() request: ExpressRequest,
    @Body() data: PlayerCreateRequest
  ): Promise<Player> {
    this.setStatus(HttpStatusCode.Created);
    const {
      auth,
      context: { logger },
    } = request;
    return await new PlayerService({ auth, logger }).create(data);
  }

  @Get() // READ ALL
  public async getAllPlayers(
    @Request() request: ExpressRequest,
    @Query("handle") handle?: string
  ): Promise<Player[]> {
    const {
      auth,
      context: { logger },
    } = request;
    return handle
      ? await new PlayerService({ auth, logger }).search(handle)
      : await new PlayerService({ auth, logger }).readAll();
  }

  @Get("{playerId}") // READ
  public async getPlayer(
    @Request() request: ExpressRequest,
    @Path() playerId: string
  ): Promise<Player> {
    const {
      auth,
      context: { logger },
    } = request;
    return await new PlayerService({ auth, logger }).read(playerId);
  }

  @Put("{playerId}") // UPDATE
  public async updatePlayer(
    @Request() request: ExpressRequest,
    @Path() playerId: string,
    @Body() data: PlayerUpdateRequest
  ): Promise<Partial<Player>> {
    const {
      auth,
      context: { logger },
    } = request;
    return await new PlayerService({ auth, logger }).update(playerId, data);
  }

  @Delete("{playerId}") // DELETE
  public async deletePlayer(
    @Request() request: ExpressRequest,
    @Path() playerId: string
  ): Promise<void> {
    this.setStatus(HttpStatusCode.NoContent);
    const {
      auth,
      context: { logger },
    } = request;
    return await new PlayerService({ auth, logger }).delete(playerId);
  }
}
