import { HttpStatusCode } from "axios";
import { Request as ExpressRequest } from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route } from "tsoa";

import { User } from "../models";
import { UserCreateRequest, UserService, UserUpdateRequest } from "../services";

@Route("v1/users")
export class UserControllerV1 extends Controller {
  @Post() // CREATE
  public async createUser(
    @Request() request: ExpressRequest,
    @Body() data: UserCreateRequest
  ): Promise<User> {
    this.setStatus(HttpStatusCode.Created);
    const {
      auth,
      context: { logger },
    } = request;
    return await new UserService({ auth, logger }).create(data);
  }

  @Get() // READ ALL
  public async getAllUsers(
    @Request() request: ExpressRequest,
    @Query("handle") handle?: string
  ): Promise<User[]> {
    const {
      auth,
      context: { logger },
    } = request;
    return handle
      ? await new UserService({ auth, logger }).search(handle)
      : await new UserService({ auth, logger }).readAll();
  }

  @Get("{userId}") // READ
  public async getUser(@Request() request: ExpressRequest, @Path() userId: string): Promise<User> {
    const {
      auth,
      context: { logger },
    } = request;
    return await new UserService({ auth, logger }).read(userId);
  }

  @Put("{userId}") // UPDATE
  public async updateUser(
    @Request() request: ExpressRequest,
    @Path() userId: string,
    @Body() data: UserUpdateRequest
  ): Promise<Partial<User>> {
    const {
      auth,
      context: { logger },
    } = request;
    return await new UserService({ auth, logger }).update(userId, data);
  }

  @Delete("{userId}") // DELETE
  public async deleteUser(
    @Request() request: ExpressRequest,
    @Path() userId: string
  ): Promise<void> {
    this.setStatus(HttpStatusCode.NoContent);
    const {
      auth,
      context: { logger },
    } = request;
    return await new UserService({ auth, logger }).delete(userId);
  }
}
