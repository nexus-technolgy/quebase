import type { Query, WhereFilterOp } from "firebase-admin/firestore";
import { AuthData } from "firebase-functions/lib/common/providers/https";

import { store } from "..";
import { ForbiddenError, NotFoundError, R, ReferenceError } from "../models";

export type SearchQuery = [
  string,
  WhereFilterOp,
  string | number | boolean | Array<string | number | boolean>
];

const generateRefererenceError = (action: string) => {
  return {
    message: `Cannot ${action} document`,
    details: "missing 'path' argument",
  };
};

const generateForbiddenError = (action: string) => {
  return {
    message: `Cannot ${action} document`,
    details: "Forbidden",
  };
};

export class DataService {
  ownerQuery: SearchQuery;
  constructor(private auth: AuthData, private collection: string, private path?: string) {
    this.ownerQuery = ["uid", "==", this.auth.uid];
  }

  async find<T = R>(searchQuery: SearchQuery[]): Promise<T[]> {
    const collectionReference = store.collection(this.collection);

    let collectionQuery: Query = collectionReference;
    for (const query of searchQuery) {
      collectionQuery = collectionQuery.where(...query);
    }

    const queryResult = await collectionQuery.get();
    if (queryResult.empty) return [];

    const resultSet = new Set<T>();
    for (const document of queryResult.docs) {
      const { id } = document;
      resultSet.add({ id, ...document.data() } as T);
    }

    return Array.from(resultSet);
  }

  async findOwn<T = R>(searchQuery: SearchQuery[]): Promise<T[]> {
    const ownSearch = [this.ownerQuery, ...searchQuery];
    return this.find<T>(ownSearch);
  }

  async readAll<T = R>(): Promise<T[]> {
    return this.find<T>([]);
  }

  async readAllOwn<T = R>(): Promise<T[]> {
    return this.find<T>([this.ownerQuery]);
  }

  async read<T = R>(own = false): Promise<T> {
    if (!this.path) throw new ReferenceError(generateRefererenceError("read"));

    const documentReference = store.collection(this.collection).doc(this.path);
    const document = await documentReference.get();

    if (!document.exists) throw new NotFoundError(`${this.path} not found`);

    if (own && document.get("uid") !== this.auth.uid)
      throw new ForbiddenError(generateForbiddenError("read"));

    const { id } = documentReference;
    return { id, ...document.data() } as T;
  }

  async readOwn<T = R>(): Promise<T> {
    return this.read<T>(true);
  }

  async write<T extends R>(data: T): Promise<{ id: string } & typeof data> {
    const documentReference = this.path
      ? store.collection(this.collection).doc(this.path)
      : store.collection(this.collection).doc();

    // when specified by ID a user should only be able to overwrite to their own documents
    if (this.path && (await documentReference.get()).get("uid") !== this.auth.uid)
      throw new ForbiddenError(generateForbiddenError("write"));

    await documentReference.set(data);

    const { id } = documentReference;
    return { id, ...data };
  }

  async update<T extends R>(data: T, own = false): Promise<({ id: string } & typeof data) | T> {
    if (!this.path) throw new ReferenceError(generateRefererenceError("update"));

    const documentReference = store.collection(this.collection).doc(this.path);
    const document = await documentReference.get();

    if (!document.exists) throw new NotFoundError(`${this.path} not found`);

    if (own && document.get("uid") !== this.auth.uid)
      throw new ForbiddenError(generateForbiddenError("update"));

    documentReference.set(data, { merge: true });

    const { id } = documentReference;
    return { id, ...document.data(), ...data };
  }

  async updateOwn<T extends R>(data: T): Promise<({ id: string } & typeof data) | T> {
    return this.update<T>(data, true);
  }

  async delete(own = false) {
    if (!this.path) throw new ReferenceError(generateRefererenceError("delete"));

    const documentReference = store.collection(this.collection).doc(this.path);

    if (own && (await documentReference.get()).get("uid") !== this.auth.uid)
      throw new ForbiddenError(generateForbiddenError("delete"));

    return (await documentReference.delete()).writeTime;
  }

  async deleteOwn() {
    return this.delete(true);
  }
}
